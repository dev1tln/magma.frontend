import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { INVENTAIRE_INFO, CACHE_INVENTAIRE } from '../graphql/queries';
import { map } from 'rxjs/operators';
import { Article } from '../models/model';

@Injectable()
export class InventaireService {
  private init = false;
  constructor(private apollo: Apollo) { }

  /**
   * Controle interne dans le but de savoir si un inventaire est chargé dans le cache.
   */
  exist(): boolean {
    return this.init;
  }

  getNouveauInventaire(): any {
    return this.apollo.getClient().readQuery<any>({
      query: CACHE_INVENTAIRE,
    }).inventaires[1];
  }

  getAncientInventaire(): any {
    return this.apollo.getClient().readQuery<any>({
      query: CACHE_INVENTAIRE,
    }).inventaires[0];
  }

  // Sauvegarde les inventaires en cours dans le caches
  initInventaire(pDetention: string) {
    this.init = true;
    return this.apollo.watchQuery<any>({
      query: INVENTAIRE_INFO,
      variables: {
        detention: pDetention,
      }
    }).valueChanges.pipe(map(result => {
      this.apollo.getClient().writeData({
        data: {
          inventaires: result.data.inventaires,
        }
      });
      return result.data.inventaires;
    }));
  }

  ajouterArticle(article: Article) {
  }
}
