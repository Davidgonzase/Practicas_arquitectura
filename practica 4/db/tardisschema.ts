import mongoose from "npm:mongoose@7.6.3";
import {tardis} from "./types.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const Tardisschema = new Schema(
  {
    nombre:{ type: String, required:true},
    planetas:{type:[String],required:false}
  },
  { timestamps: true }
);

export type TardisModelType = mongoose.Document & Omit<tardis,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<TardisModelType>("Tardis", Tardisschema);