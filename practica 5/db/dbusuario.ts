import mongoose from "mongoose";
import { Usuario } from "../types.ts";

const Schema = mongoose.Schema;
const UsuarioSchema = new Schema(
    {
        nombre:{type:String,required:true},
        correoElectronico:{type:String,required:true},
        coleccion:{type:Schema.Types.ObjectId,ref:'Coleccion',required:true},
    },
    { timestamps: true}
);

export type UsuarioModel = mongoose.Document & Omit<Usuario, "id">;
export default mongoose.model<UsuarioModel>('Usuario',UsuarioSchema);