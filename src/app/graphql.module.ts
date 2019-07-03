import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, defaults } from './shared/graphql/resolver.apollo';
import { typeDef } from './shared/graphql/typeDef.apollo';

const uri = 'http://localhost:3000';
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
    resolvers,
    defaults,
    typeDef,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
