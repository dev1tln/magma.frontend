import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Article, Inventaire } from '../models/model';
import { AJOUTER_ARTICLE } from '../graphql/mutations';
import { INVENTAIRE_NOUVEAU } from '../graphql/queries';

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
  ajouterArticleScanne(article: Article) {
    if (!this.controlesInventaire(article)) {
      throw Error('Article déjà présent');
    }

    this.apollo.mutate({
      mutation: AJOUTER_ARTICLE,
      variables: {
        articleId: article.article_id,
        inventaireId: this.nouveauInventaire.id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        ajouterArticle: {
          __typename: 'Article',
          article_id: article.article_id,
          lib: article.lib,
          numref: article.numref,
          numser: article.numser,
          pictureUrl: article.pictureUrl,
        }
      },
      update: (proxy, { data: { ajouterArticle } }) => {
        // Read the data from our cache for this query.
        const data: any = proxy.readQuery({ query: INVENTAIRE_NOUVEAU });
        // Write our data back to the cache with the new comment in it
        proxy.writeQuery({
          query: INVENTAIRE_NOUVEAU, data: {
            ...data,
            articles: [...data.articles, ajouterArticle]
          }
        });
      }
    });
  }

  // Different Controle à faire
  controlesInventaire(article: Article): boolean {
    // Test contient l'article
    if (this.nouveauInventaire.articles.filter(item => item.article_id === article.article_id).length > 0) {
      return false;
    }
    return true;
  }


}
