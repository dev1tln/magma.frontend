export const typeDef = `
  type Inventaire {
    id: ID!
    lib: String!
    dtever: DateTime
    exideb: String
    dtecre: DateTime
    cdevrf: String
    obs: String
    articles: [Article!]
  }

  type Article {
    id: ID!
    createdAt: DateTime
    nno: String!
    lib: String!
    untcpt: Int
    untprx: Float
    cdeapr: String
    srvpou: String
    typart: String
    numser: String
    gisement: Gisement
  }

  type Gisement {
    id: ID!
    lib: String!
  }

  type Mutation {
    setMobile(mobile: Boolean!)
    setGisement(gisement: Gisement!)
    setInventaire(inventaire: Inventaire!)
    addArticle(article: Article!)
  }

  type Query {
    isMobile: Boolean
    gisement: Gisement
    inventaire: Inventaire
  }
`;
