import mongoose from "mongoose";
import { comic } from "../types.ts";

const Schema = mongoose.Schema;
const ComicSchema = new Schema(
    {
        nombre:{type:String,required:true},
        descripcion:{type:String,required:true},
        formato:{type:String,required:true}
    },
    { timestamps: true}
);

export type ComicModel = mongoose.Document & Omit<comic, "id">;
export default mongoose.model<ComicModel>('Comic',ComicSchema);