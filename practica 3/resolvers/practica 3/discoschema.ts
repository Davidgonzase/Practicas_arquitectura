import mongoose from "npm:mongoose@7.6.3";
import { disco,types } from "./discotype.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const discoSchema = new Schema(
  {
    nombre:{ type: String, required: true },
    autor:{ type: String, required: true },
    type:{ type: String,types,required: true }, //Utilizamos los valores del enum
    matriz:{ type: String, required: true },
    pais_de_impresion:{ type: String, required: true },
    arte_de_portada:{ type: String, required: true },
  },
  { timestamps: true }
);

export type DiscoModelType = mongoose.Document & Omit<disco,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<DiscoModelType>("Disco", discoSchema);