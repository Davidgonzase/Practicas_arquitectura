import mongoose from "npm:mongoose@7.6.3";
import {planeta } from "./types.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const planetschema = new Schema(
  {
    nombre:{ type: String, required: true },
    personas:{type:[String],required:true}
  },
  { timestamps: true }
);

export type PlanetModelType = mongoose.Document & Omit<planeta,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<PlanetModelType>("Planeta", planetschema);