import UsuarioSchema from "../../db/dbusuario.ts"
import ColeccionSchema from "../../db/dbcoleccion.ts"
import { UsuarioModel } from "../../db/dbusuario.ts";
import { GraphQLError } from "graphql";

const createuser = async (nombre:string,correoElectronico:string):Promise<UsuarioModel> => {
    try{
        if(!nombre||!correoElectronico)throw new Error("1")
        const nuser = new UsuarioSchema();
        nuser.correoElectronico=correoElectronico
        nuser.nombre=nombre
        const nom_col="Coleccion de "+nombre
        const ncol = new ColeccionSchema();
        ncol.nombre=nom_col
        ncol.comics=[]
        if(!ncol.id||!nuser)throw new Error("2")
        nuser.coleccion=ncol.id
        ncol.save()
        nuser.save()
        return await UsuarioSchema.findById({_id:nuser.id}) || nuser
    }catch(error){
        switch(error.message){
            case "1":
                throw new GraphQLError(`Some parameters are missing`, {
                    extensions: { code: "NOT_COMPLETE" },
                });
            case "2":
                throw new GraphQLError(`Error creating user and/or colection`, {
                    extensions: { code: "NOT_COMPLETE" },
                });
            default:
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default createuser