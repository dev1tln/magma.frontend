import gql from 'graphql-tag';

// Toute les queries de l'application

export const AUTH_USER = gql`
  mutation login($identifiant: String!, $password: String!){
    login(data: {username: $identifiant, password: $password}){
      access_token
    }
  }`;

export const AJOUTER_ARTICLE = gql`
  mutation ajouterArticle($article: ID!, $detention: ID!){
    ajouterArticle(data: {article: $article, detention:$detention}) {
        article_id,
        lib,
        numref,
        nno
        }
    }`;

export const CREATE_INVENTAIRE = gql`
  mutation createInventaire($detention: ID!){
    createInventaire(data: { detention : { connect: {id : $detention }}}) {
      id, dtever, dtecre,
      articles{
        article_id, nno, lib, typart, pictureUrl, numref, numser
      }
    }
  }`;
