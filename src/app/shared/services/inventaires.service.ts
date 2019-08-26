import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NOUVEAU, GET_ANCIENT, INVENTAIRE_INFO } from '../graphql/querries';
import { map } from 'rxjs/operators';

@Injectable()
export class InventaireService {
  constructor(private apollo: Apollo) { }

  getNouveauInventaire(): any {
    return this.apollo.getClient().readQuery<any>({
      query: GET_NOUVEAU,
    })
      .nouveauInventaire;
  }

  getAncientInventaire(): any {
    return this.apollo.getClient().readQuery<any>({
      query: GET_ANCIENT,
    })
      .ancientInventaire;
  }

  // Sauvegarde les inventaires en cours dans le caches
  setInventaire(detention: string) {
    this.apollo.query<any>({
      query: INVENTAIRE_INFO,
      variables: { detention },
    }).pipe(map(result => {
      this.apollo.getClient().writeData({
        data: {
          acientInventaire: result.data.inventaires[0],
          nouveauInventaire: result.data.inventaires[1],
        },
      });
    }));
  }
}
