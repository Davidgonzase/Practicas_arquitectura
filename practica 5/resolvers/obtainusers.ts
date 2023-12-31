import UsuarioSchema from "../db/dbusuario.ts"
import { Usuario } from "../types.ts";
import { GraphQLError } from "graphql";

const obtainusers = async ():Promise<Usuario[]> => {
    try{
        const res = await UsuarioSchema.find({});

        if(!res)throw Error;
        const users:Usuario[]=res.map(i=>{return{
            
        }})
        return users;
    }catch(error){
        throw new GraphQLError(`No pet found with breed ${breed}`, {
            extensions: { code: "NOT_FOUND" },
        });
    }
}

export default obtainusers