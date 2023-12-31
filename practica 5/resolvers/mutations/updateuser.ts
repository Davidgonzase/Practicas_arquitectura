import UsuarioSchema from "../../db/dbusuario.ts"
import ColeccionSchema from "../../db/dbcoleccion.ts";
import { UsuarioModel } from "../../db/dbusuario.ts";
import { GraphQLError } from "graphql";

const updateuser = async (iduser:string,nombre:string,correoElectronico:string):Promise<UsuarioModel> => {
    try{
        if(!iduser)throw new Error("1")
        let user
        try {
            user = await UsuarioSchema.findById({_id:iduser}).exec()
        } catch (error) {
            console.log(error.message)
            throw new Error("2")
        }
        if(!user)throw new Error("2")
        user.nombre = nombre || user.nombre
        user.correoElectronico = correoElectronico || user.correoElectronico
        if(nombre){
            const fcolum = await ColeccionSchema.findById({_id:user.coleccion}).exec()
            if(!fcolum)throw new Error
            fcolum.nombre="Coleccion de "+nombre
            fcolum.save()
        }
        user.save()
        return user
    }catch(error){
        switch(error.message){
            case "1":
                throw new GraphQLError(`Some parameters are missing`, {
                    extensions: { code: "NOT_COMPLETE" },
                });
            case "2":
                throw new GraphQLError(`No user found with id ${iduser}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            default:
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default updateuser