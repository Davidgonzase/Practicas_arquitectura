import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import obtain from "./resolvers/obtainall.ts";
import newperson from "./resolvers/newperson.ts";
import newdim from "./resolvers/newdimension.ts";
import newplanet from "./resolvers/newplanet.ts";
import newtardis from "./resolvers/newtardis.ts";
import deleteperson from "./resolvers/delete_person.ts";
import obtainperson from "./resolvers/obtainperson.ts";
import deletetardis from "./resolvers/delete_tardis.ts";
import obtaindims from "./resolvers/obtaindim.ts";
import deletedim from "./resolvers/delete_dimension.ts";
import obtainplanets from "./resolvers/obtainplnt.ts";
import deleteplanet from "./resolvers/delete_planetas.ts";
import updatedim from "./resolvers/update_dimension.ts";
import updateperson from "./resolvers/update_person.ts";
import updateplnt from "./resolvers/update_planet.ts";
import updatetardis from "./resolvers/update_tardis.ts";


const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.log("No mongo URL found");
}else{
  await mongoose.connect(MONGO_URL);

  const app = express();

  app.use(express.json())


  app
  .get("/api/getTardis",obtain)
  .get("/api/getpersons",obtainperson)
  .get("/api/getdimensions",obtaindims)
  .get("/api/getplanets",obtainplanets)
  .post("/api/newtardis",newtardis)
  .post("/api/newdimension",newdim)
  .post("/api/newplanet",newplanet)
  .post("/api/newperson",newperson)
  .delete("/api/deleteperson/:id",deleteperson)
  .delete("/api/deletetardis/:id",deletetardis)
  .delete("/api/deleteplanet/:id",deleteplanet)
  .delete("/api/deletedimension/:id",deletedim)
  .put("/api/updatetardis/:id",updatetardis)
  .put("/api/updatedimension/:id",updatedim)
  .put("/api/updateplanet/:id",updateplnt)
  .put("/api/updateperson/:id",updateperson)


  app.listen(3000, () => {
      console.log("Server listening on port 3000");
  });
}

