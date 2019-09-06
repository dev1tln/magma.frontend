import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/queries';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) { }


  isAuth(): boolean {
    let result;
    const token = localStorage.getItem('token');
    (token !== null) ? result = true : result = false;
    return result;
  }

  /**
   * Méthode pour s'autentifiier et qui initialise le cache + JWT Token.
   * @param pIdentifiant identifiant de l'utilisateur
   * @param pPassword mot de passe de l'utilisateur
   */
  async login(pIdentifiant: string, pPassword: string) {
    // Init du token
    return await this.apollo.mutate({
      mutation: AUTH_USER,
      variables: {
        identifiant: pIdentifiant,
        password: pPassword,
      }
    }).pipe(map(async result => {
      localStorage.setItem('token', result.data.login.access_token);
      await this.initUser(pIdentifiant);
    })).toPromise();
  }

  /**
   * Initialise l'utilisateur dans le cache.
   * @param pIdentifiant identifiant de l'user
   */
  async initUser(pIdentifiant: string): Promise<any> {
    return await this.apollo.query<any>({
      query: USER_INFO,
      variables: {
        identifiant: pIdentifiant,
      }
    }).pipe(map(result => {
      this.apollo.getClient().writeData({
        data: { utilisateur: result.data.user }
      });
    })).toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
