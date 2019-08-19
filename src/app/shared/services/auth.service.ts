import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/querries';

@Injectable()
export class AuthService {
  constructor(
    private apollo: Apollo) { }


  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  login(identifiant: string, password: string) {
    this.apollo.mutate({
      mutation: {
        AUTH_USER,
      },
      variables: {
        identifiant,
        password
      }
    }).subscribe(data => localStorage.setItem('token', data.acces_token));

    const user = {};

    this.apollo.watchQuery({
      query: {
        USER_INFO,
      },
      variables: {
        identifiant
      }
    }).valueChanges.subscribe(data => {
      user = data.user;
    });

  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
