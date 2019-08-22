import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/querries';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { resultKeyNameFromField } from 'apollo-utilities';

@Injectable()
export class AuthService {
  unite_id: string;
  detention_id: string;

  constructor(
    private apollo: Apollo) { }


  isAuth(): boolean {
    let result;
    const token = localStorage.getItem('token');
    (token !== null) ? result = true : result = false;
    return result;
  }

  login(identifiant: string, password: string) {
    // Init du token
    this.apollo.mutate({
      mutation: AUTH_USER,
      variables: {
        identifiant,
        password,
      }
    }).subscribe(result => {
      localStorage.setItem('token', result.data.login.access_token);
    });

    // On charge les infos sur l'utilisateur
    return this.apollo.query<any>({
      query: USER_INFO,
      variables: {
        identifiant
      }
    }).pipe(map(result => {
      if (result.data === null) {
        return throwError('Data null');
      }
      this.apollo.getClient().writeData({ data: { user: result.data.user } });
      return result.data.user;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }

  getUniteId() {
    return this.unite_id;
  }

  getDetentionId() {
    return this.detention_id;
  }

  setUniteId(value) {
    this.unite_id = value;
  }

  setDetentionId(value) {
    this.detention_id = value;
  }
}
