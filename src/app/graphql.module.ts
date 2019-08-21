import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from 'src/environments/environment.prod';
import { onError } from 'apollo-link-error';


@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpClient: HttpClient) {
    const httpLink = new HttpLink(httpClient).create({
      uri: `http://${environment.graphqlUrl}`,
    });


    const subscriptionLink = new WebSocketLink({
      uri:
        `ws://${environment.graphqlUrl}/graphql`,
      options: {
        reconnect: true,
      }
    });

    const error = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          return graphQLErrors;
        }
        );
      }

      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      ApolloLink.from([error, httpLink]),
    );

    const authLink = new ApolloLink((operation, forward) => {
      // Get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    apollo.create({
      link: authLink.concat(link),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}
