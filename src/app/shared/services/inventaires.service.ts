import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Article, Inventaire } from '../models/model';
import { AJOUTER_ARTICLE } from '../graphql/mutations';
import { INVENTAIRE_NOUVEAU } from '../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable()
export class InventaireService {
  private detentionId: string = null;

  ancientInventaire: Inventaire;
  nouveauInventaire: Inventaire;

  constructor(private apollo: Apollo) { }

  setDetention(id: string) {
    this.detentionId = id;
  }

  getDetention(): string {
    return this.detentionId;
  }

  // Ajoute un article en inventaire
  async ajouterArticleScanne(article: any) {
    await this.controlesInventaire(article).catch(err => { throw err; });

    console.log("1");

    this.apollo.mutate({
      mutation: AJOUTER_ARTICLE,
      variables: {
        articleId: article.article_id,
        inventaireID: this.nouveauInventaire.id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        ajouterArticle: {
          __typename: 'Article',
          article_id: article.article_id,
          lib: article.lib,
          numref: article.numref,
          nno: article.nno,
        }
      },
      update: (proxy, { data: { ajouterArticle } }) => {

        console.log("2");
        // Read the data from our cache for this query.
        const data: any = proxy.readQuery({ query: INVENTAIRE_NOUVEAU, variables: { detention: this.detentionId } });

        data.inventaires[0].articles.push(ajouterArticle);

        // Write our data back to the cache with the new comment in it
        proxy.writeQuery({
          query: INVENTAIRE_NOUVEAU, data: {
            ...data
          },
          variables: { detention: this.detentionId }
        });
      }
    }).subscribe();
  }

  // Different Controle à faire
  async controlesInventaire(article: Article): Promise<any> {

    await this.apollo.query<any>({ query: INVENTAIRE_NOUVEAU, variables: { detention: this.detentionId } })
      .pipe(map(result => {
        if (result.data.inventaires[0].articles.some(item => item.article_id === article.article_id)) {
          throw Error('Article déjà présent');
        }
      })).toPromise();
    // Test contient l'article
  }


}
