import ComicSchema from "../../db/dbcomic.ts"
import { comic } from "../../types.ts";
import { GraphQLError } from "graphql";

const obtaincomicid = async (id:string):Promise<comic> => {
    try{
        let res;
        try {
            res = await ComicSchema.findById({_id:id});
            if(!res)throw Error;
        } catch (error) {
            throw new GraphQLError(`No User with id ${id} found`, {
                extensions: { code: "NOT_FOUND" },
            });
        }

        const user:comic={
            titulo:res.titulo,
            id:res._id,
            descripcion:res.descripcion,
            formato:res.formato
        }

        return user;
    }catch(error){
        throw new GraphQLError(`Intertal database error`, {
            extensions: { code: "DB_ERROR" },
        });
    }
}

export default obtaincomicid