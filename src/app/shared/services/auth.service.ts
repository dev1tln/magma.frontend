import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/queries';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private apollo: Apollo) { }


  isAuth(): boolean {
    let result;
    const token = localStorage.getItem('token');
    (token !== null) ? result = true : result = false;
    return result;
  }

  login(pIdentifiant: string, pPassword: string) {
    // Init du token
    this.apollo.mutate({
      mutation: AUTH_USER,
      variables: {
        identifiant: pIdentifiant,
        password: pPassword,
      }
    }).subscribe(result => {
      localStorage.setItem('token', result.data.login.access_token);
    });

    // On charge les infos sur l'utilisateur
    return this.apollo.watchQuery<any>({
      query: USER_INFO,
      variables: {
        identifiant: pIdentifiant,
      }
    }).valueChanges.pipe(map(result => {
      if (result.data === null) {
        return throwError('Data null');
      }
      this.apollo.getClient().writeData({
        data: { utilisateur: result.data.user }
      });
      return result.data.user;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
