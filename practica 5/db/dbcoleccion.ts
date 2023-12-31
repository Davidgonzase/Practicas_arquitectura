import mongoose from "mongoose";
import { coleccioncomics } from "../types.ts";

const Schema = mongoose.Schema;
const ColeccionSchema = new Schema(
    {
        nombre:{type:String,required:true},
        comics:{type:[Schema.Types.ObjectId],ref:'Comic',required:true},
    },
    { timestamps: true}
);

export type ColeccionModel = mongoose.Document & Omit<coleccioncomics, "id">;
export default mongoose.model<ColeccionModel>('Coleccion',ColeccionSchema);