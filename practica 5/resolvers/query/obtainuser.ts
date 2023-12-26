import UsuarioSchema from "../../db/dbusuario.ts"
import { UsuarioModel } from "../../db/dbusuario.ts";
import { GraphQLError } from "graphql";

const obtainuser = async (id:string):Promise<UsuarioModel> => {
    try{
        let res;
        try {
            res= await UsuarioSchema.findById({_id:id});
        } catch (error) {
            console.log(error.message)
            throw new Error("1")
        }
        if(!res)throw new Error("1");
        return res;
    }catch(error){
        switch (error.message){
        case "1":
            throw new GraphQLError(`No user found with id ${id}`, {
                extensions: { code: "NOT_FOUND" },
            });
        default:
            throw new GraphQLError(`Internal API Error`, {
                extensions: { code: "INTERNAL_ERROR" },
            });
        }
    }
}

export default obtainuser