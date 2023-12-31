import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
//Importamos los resolvers
import obtain from "./resolvers/obtain.ts";
import obtainname from "./resolvers/obtainname.ts";
import obtainid from "./resolvers/obtainid.ts";
import obtaintype from "./resolvers/obtaintype.ts";
import newdisc from "./resolvers/newdisc.ts";
import obtaincountry from "./resolvers/obtaincountry.ts";
import deletedisc from "./resolvers/deletedisc.ts";
import updatedisc from "./resolvers/updatedisc.ts";
import help from "./resolvers/help.ts"
//Cargamos la base de datos desde el fichero en env
const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json())


app
.get("/obtain",obtain)
.get("/obtain/name/:name",obtainname)
.get("/obtain/id/:id",obtainid)
.get("/obtain/type/:type",obtaintype)
.get("/obtain/country/:country",obtaincountry)
.post("/newdisc",newdisc)
.put("/updatedisc/:id",updatedisc)
.delete("/deletedisc/:id",deletedisc)
.get("/help",help)


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
