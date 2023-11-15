import mongoose from "npm:mongoose@7.6.3";
import {persona} from "./types.ts";

const Schema = mongoose.Schema; 
const personaschema = new Schema(
  {
    nombre:{ type: String, required: true }
  },
  { timestamps: true }
);

export type PersonModelType = mongoose.Document & Omit<persona,"id">;
export default mongoose.model<PersonModelType>('Persona', personaschema);