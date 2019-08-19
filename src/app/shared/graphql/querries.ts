import gql from 'graphql-tag';

// Toute les queries de l'application

export const USER_INFO = gql`
  query userInfo($identifiant: String!){
    user(where: {identifiant: "jessy.tavares"}){
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

