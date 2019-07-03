import gql from 'graphql-tag';

export const defaults = {
  isMobile: false,
  gisement: null,
  inventaire: null,
};

export const resolvers = {
  Mutation: {
    setMobile: (_, { mobile }, { cache }) => {
      cache.writeData({ isMobile: mobile });
      return null;
    },
    setGisement: (_, data, { cache }) => {
      cache.writeData({ gisement: data });
      return null;
    },
    setInventaire: (_, data, { cache }) => {
      cache.writeData({ inventaire: data });
      return null;
    },
    addArticle: (_, data, { cache }) => {
      const query = gql`
        query GetInventaire {
          inventaire @client {
            articles{
              id
              createdAt
              nno
              lib
              untcpt
              untprx
              cdeapr
              srvpou
              typart
              numser
              gisement{
                id
                lib
              }
            }
          }
      `;
      const previous = cache.readQuery({ query });
      const result = {
        articles: previous.inventaire.articles.concat([data]),
      };
      cache.writeData({
        inventaire: {
          articles: result,
        }
      });
      return null;
    },
  },
};
