import UsuarioSchema from "../../db/dbusuario.ts"
import { UsuarioModel } from "../../db/dbusuario.ts";
import { GraphQLError } from "graphql";

const obtainusers = async ():Promise<UsuarioModel[]> => {
    try{
        const res= await UsuarioSchema.find({});
        if(!res)throw new Error;
        return res;
    }catch(error){
        console.log(error.message)
        throw new GraphQLError(`No Users found`, {
            extensions: { code: "NOT_FOUND" },
        });
    }
}

export default obtainusers