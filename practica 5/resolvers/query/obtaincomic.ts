import { ComicModel } from "../../db/dbscomic.ts";
import ComicSchema from "../../db/dbscomic.ts"
import { GraphQLError } from "graphql";

const obtaincomic = async (id:string):Promise<ComicModel> => {
    try{
        let res
        try {
            res = await ComicSchema.findById({_id:id});
        } catch (error) {
            console.log(error.message)
            throw new Error("1")
        }
        if(!res)throw new Error("2");
        return res;
    }catch(error){
        switch(error.message){
            case "1":
                throw new GraphQLError(`No comic found with id ${id}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            default:    
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default obtaincomic