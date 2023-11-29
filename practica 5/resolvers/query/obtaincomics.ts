import ComicSchema from "../../db/dbcomic.ts"
import { comic } from "../../types.ts";
import { GraphQLError } from "graphql";

const obtaincomics = async ():Promise<comic[]> => {
    try{
        const res = await ComicSchema.find({});

        if(!res)throw Error;
        const comics:comic[]=res.map(i=>{return{
            titulo:i.titulo,
            id:i._id,
            descripcion:i.descripcion,
            formato:i.formato
        }})

        return comics;
    }catch(error){
        throw new GraphQLError(`Intertal database error`, {
            extensions: { code: "DB_ERROR" },
        });
    }
}

export default obtaincomics