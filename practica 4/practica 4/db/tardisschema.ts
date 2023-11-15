import mongoose from "npm:mongoose@7.6.3";
import {tardis} from "./types.ts";


const Schema = mongoose.Schema; 
const Tardisschema = new Schema(
  {
    camuflaje:{type:String,required:true},
    regen_num:{type:Number,required:true},
    año:{type:Number,required:true},
    dimensiones:{type: [Schema.Types.ObjectId],ref:'Dimension'}
  },
  { timestamps: true }
);

export type TardisModelType = mongoose.Document & Omit<tardis,"id">;
export default mongoose.model<TardisModelType>('Tardis', Tardisschema);