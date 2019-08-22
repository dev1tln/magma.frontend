import gql from 'graphql-tag';

// Toute les queries de l'application

export const USER_INFO = gql`
  query userInfo($identifiant: String!){
    user(where: {identifiant: $identifiant}){
      nom, prenom, identifiant, role,
      unites{
        id, cdeunt, libunt,
        detentions{
          id, lib,
          inventaire{
            id, lib, dtever,
            articles{
              article_id, nno, lib, pictureUrl
            }
          }
        }
      }
    }
  }`;

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

