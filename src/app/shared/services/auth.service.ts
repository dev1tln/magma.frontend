import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/querries';
import { User } from '../models/model';

@Injectable()
export class AuthService {
  constructor(
    private apollo: Apollo) { }


  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  login(identifiant: string, password: string) {
    // Init du token
    this.apollo.mutate({
      mutation: {
        AUTH_USER,
      },
      variables: {
        identifiant,
        password
      }
    }).subscribe(result => localStorage.setItem('token', result.data.acces_token));

    // On charge les infos sur l'utilisateur
    this.apollo.watchQuery<any>({
      query: {
        USER_INFO,
      },
      variables: {
        identifiant
      }
    }).valueChanges.subscribe(result => this.apollo.getClient().writeData({ data: { user: result.data.user } }));
  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
