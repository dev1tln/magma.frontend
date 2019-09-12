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

export const INVENTAIRE_NOUVEAU = gql`
  query inventaireNouveau($detention: ID!){
    inventaires(where: {detention: {id: $detention}}, orderBy: dtecre_ASC, last: 1){
      id, lib, dtever,
      articles{
        article_id, nno, lib, typart, pictureUrl, numref, numser
      }
    }
  }`;

export const INVENTAIRE_ANCIENT = gql`
  query inventaireAncient($detention: ID!){
    inventaires(where: {detention: {id: $detention}}, orderBy: dtever_ASC, last: 1){
      id, lib, dtever,
      articles{
        article_id, nno, lib, typart, pictureUrl, numref, numser
      }
    }
  }`;

export const CACHE_UNITES = gql`{
    user{
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
  inventaires{
    id, lib, dtever,
      articles{
        article_id, nno, pictureUrl, lib, numref, numser, typart
        }
  }
}`;

