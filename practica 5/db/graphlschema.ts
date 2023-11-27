// The GraphQL schema
export const typeDefs = `#graphql
   type Usuario{
        nombre:String!
        correoElectronico:String!
        id:String!
        coleccioncomics:coleccioncomics!
    }

 type coleccioncomics{
        nombre:String!
        id:ID!
        comics:[comic!]!
    }

 type comic{
        titulo:String!
        id:ID!
        descripcion:String!
        formato:String!
    }

  type Query {
    getusers:[Usuario!]!
    getuserid(id:ID!):Usuario!
    getcomics:[comic!]!
    getcomicid(id:ID!):comic!
  }
  type Mutation {
    createuser(nombre:String!,correoElectronico:String!):Usuario!
    createcomic(titulo:String!,descripcion:String!,formato:String!):comic!
    addcomictocolection(idcomic:ID!,idcolection:ID!):String!
    deletecomicrelation(idcomic:ID!,idcolection:ID!):String!
    updatecomic(id:ID!,titulo:String,descripcion:String,formato:String):comic!
    updateuser(id:ID!,nombre:String,correoElectronico:String):Usuario!
    deletecomic(id:ID!):String!
    deleteuser(id:ID!):String!
  }
`;