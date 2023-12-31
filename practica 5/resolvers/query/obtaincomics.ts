import { ComicModel } from "../../db/dbscomic.ts";
import ComicSchema from "../../db/dbscomic.ts"
import { GraphQLError } from "graphql";

const obtaincomics = async ():Promise<ComicModel[]> => {
    try{
        const res= await ComicSchema.find({});
        if(!res)throw new Error;
        return res;
    }catch(error){
        console.log(error.message)
        throw new GraphQLError(`No Comic found`, {
            extensions: { code: "NOT_FOUND" },
        });
    }
}

export default obtaincomics