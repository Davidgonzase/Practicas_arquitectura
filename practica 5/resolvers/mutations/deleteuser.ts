import UsuarioSchema from "../../db/dbusuario.ts"
import ColeccionSchema from "../../db/dbcoleccion.ts"
import { GraphQLError } from "graphql";

const deleteuser = async (iduser:string):Promise<string> => {
    try{
        if(!iduser)throw new Error("1");
        let res;
        try{
            res= await UsuarioSchema.findByIdAndDelete({_id:iduser})
        }catch(error){
            console.log(error.message)
            throw new Error("2")
        }
        if(!res)throw new Error("2");
        await ColeccionSchema.findByIdAndDelete({_id:res.coleccion}).exec()
        return "Operacion efectuada"
    }catch(error){
        switch(error.message){
            case "1":
                throw new GraphQLError(`Some parameters are missing`, {
                    extensions: { code: "NOT_COMPLETE" },
                });
            case "2":
                throw new GraphQLError(`No Comic found with id ${iduser}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            default:
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default deleteuser