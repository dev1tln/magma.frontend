import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH_USER } from 'src/app/shared/graphql/mutations';
import { USER_INFO } from 'src/app/shared/graphql/queries';
import { map, first } from 'rxjs/operators';

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

  async login(pIdentifiant: string, pPassword: string) {
    // Init du token
    return await this.apollo.mutate({
      mutation: AUTH_USER,
      variables: {
        identifiant: pIdentifiant,
        password: pPassword,
      }
    }).pipe(map(async result => {
      console.log("1");
      localStorage.setItem('token', result.data.login.access_token);
      await this.initUser(pIdentifiant).then(() => console.log("3"));
    })).toPromise();
  }

  async initUser(pIdentifiant: string): Promise<any> {
    console.log("2");
    return await this.apollo.query<any>({
      query: USER_INFO,
      variables: {
        identifiant: pIdentifiant,
      }
    }).pipe(map(result => {
      this.apollo.getClient().writeData({
        data: { utilisateur: result.data.user }
      });
      console.log("2.5");
    })).toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
  }
}
