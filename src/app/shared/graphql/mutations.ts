import gql from 'graphql-tag';

// Toute les queries de l'application

export const AUTH_USER = gql`
  mutation login($identifiant: String!, $password: String!){
    login(data: {username: $identifiant, password: $password}){
      access_token
    }
  }`;

export const AJOUTER_ARTICLE = gql`
  mutation ajouterArticle($articleId: ID!, $inventaireID: ID!){
    ajouterArticle(data: {articleId: $articleId, inventaireId:$inventaireID}) {
        article_id,
        lib,
        numref,
        numser,
        pictureUrl,
        }
    }`;



