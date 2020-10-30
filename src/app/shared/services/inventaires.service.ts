import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Article, Inventaire } from '../models/model';
import { AJOUTER_ARTICLE, CREATE_INVENTAIRE } from '../graphql/mutations';
import { INVENTAIRE_NOUVEAU } from '../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable()
export class InventaireService {
  private detentionId: string = null;
  private detentionLibelle: string = null;

  ancientInventaire: Inventaire;
  nouveauInventaire: Inventaire;

  constructor(private apollo: Apollo) { }

  setDetention(id: string) {
    this.detentionId = id;
  }

  getDetention(): string {
    return this.detentionId;
  }

  setDetentionLibelle(libelle: string) {
    this.detentionLibelle = libelle;
  }
  getLibelleDetention(): string {
     return this.detentionLibelle;
  }

  // Ajoute un article en inventaire
  async ajouterArticleScanne(article: any) {
    await this.controlesInventaire(article).catch(err => { throw err; });

    this.apollo.mutate({
      mutation: AJOUTER_ARTICLE,
      variables: {
        article: article.article_id,
        detention: this.detentionId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        ajouterArticle: {
          __typename: 'Article',
          article_id: article.article_id,
          lib: article.lib,
          numref: article.numref,
          nno: article.nno,
          pictureURL: null,
          typeart: null,
          numser: null,
        }
      },
      update: (proxy, { data: { ajouterArticle } }) => {

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

  // Creer un nouvel inventaire
  nouvelInventaire() {

    // TODO moin moche si possible
    this.nouveauInventaire.id = null;

    this.apollo.mutate({
      mutation: CREATE_INVENTAIRE,
      variables: {
        detention: this.detentionId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createInventaire: {
          __typename: 'Inventaire',
          id: null,
          articles: [],
          dtecre: new Date().toISOString().toString(),
          dtever: null,
        }
      },
      update: (proxy, { data: { createInventaire } }) => {

        // Write our data back to the cache with the new comment in it
        proxy.writeQuery({
          query: INVENTAIRE_NOUVEAU, data: {
            inventaires: [createInventaire],
          },
          variables: { detention: this.detentionId }
        });
        this.nouveauInventaire = createInventaire;
      }
    }).subscribe();
  }
}
