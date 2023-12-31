import mongoose from "npm:mongoose@7.6.3";
import { dimension } from "./types.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const dimschema = new Schema(
  {
    nombre:{ type: String, required: true },
    planetas:{type: [Schema.Types.ObjectId],ref:'Planeta',required:true}
  },
  { timestamps: true }
);

export type DimensionModelType = mongoose.Document & Omit<dimension,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<DimensionModelType>('Dimension', dimschema);