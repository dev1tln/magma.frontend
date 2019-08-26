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
  query inventaireInfo($detention: String!){
    inventaires(where: {detention: {id: $detention}}, orderBy: dtecre_ASC, last: 2){
      id, lib, dtever,
      articles{
        article_id, nno, lib, pictureUrl, typart
      }
    }
  }`;



// Queries dans le cache

export const GET_UNITES = gql`{
    user {
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

export const GET_NOUVEAU = gql`{
    nouveauInventaire{
      id, lib, dtever,
      articles{
        article_id, nno, pictureUrl, lib
        }
      }
    }
`;

export const GET_ANCIENT = gql`{
    ancientInventaire{
      id, lib, dtever,
      articles{
        article_id, nno, pictureUrl, lib
        }
      }
    }
`;

