import gql from 'graphql-tag';

// Queries vers le webservice

export const USER_INFO = gql`
  query userInfo($identifiant: String!){
    user(where: {identifiant: $identifiant}){
      nom, prenom, identifiant, role,
      unites{
        id, cdeunt, libunt,
        detentions{
          id, lib,
        }
      }
    }
  }`;

export const INVENTAIRE_INFO = gql`
  query inventaireInfo($detention: ID!){
    inventaires(where: {detention: {id: $detention}}, orderBy: dtecre_ASC, last: 2){
      id, lib, dtever,
      articles{
        article_id, nno, lib, typart, pictureUrl, numref
      }
    }
  }`;
// Queries dans le cache

export const CACHE_UNITES = gql`{
    utilisateur @client{
      unites {
        id
        cdeunt
        libunt
        detentions {
          id
          lib
        }
      }
    }
}
`;

export const CACHE_INVENTAIRE = gql`
query getInventaires{
  inventaires @client{
    id, lib, dtever,
      articles{
      article_id, nno, pictureUrl, lib, numref
              }
  }
}`;

