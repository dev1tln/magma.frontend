import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/queries';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private identifiant: string = null;

  constructor(private apollo: Apollo) { }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (token === null || this.identifiant === null) { return false; }
    return true;
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
      this.identifiant = pIdentifiant;
      localStorage.setItem('token', result.data.login.access_token);
    })).toPromise();
  }

  /**
   * GET infos de l'utilisateur connecté.
   */
  getUser() {
    return this.identifiant;
  }

  logout() {
    localStorage.removeItem('token');
    this.identifiant = null;
    this.apollo.getClient().resetStore();
  }
}
