import mongoose from "npm:mongoose@7.6.3";
import {persona} from "./types.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const personaschema = new Schema(
  {
    nombre:{ type: String, required: true }
  },
  { timestamps: true }
);

export type PersomModelType = mongoose.Document & Omit<persona,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<PersomModelType>("Persona", personaschema);