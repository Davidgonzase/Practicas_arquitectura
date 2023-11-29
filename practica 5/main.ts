import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query/query.ts";
import { typeDefs } from "./db/graphlschema.ts";
import { Mutation } from "./resolvers/mutations/mutations.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import mongoose from "mongoose";

const env = await load(); 

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); 


try {
  if(!MONGO_URL)throw Error("MONGO_URL NOT PRESENT");
  mongoose.connect(MONGO_URL);
  console.log("Conexión exitosa a MongoDB");
} catch (error) {
  console.error("Error al conectar a MongoDB:", error);
  Deno.exit(0)
}

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);