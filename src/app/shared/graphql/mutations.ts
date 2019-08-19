import gql from 'graphql-tag';

// Toute les queries de l'application

export const AUTH_USER = gql`
mutation login($identifiant: String!, $password: String!){
  login(data: {username: $identifiant, password: $password}){
    acces_token
  }
}`;



