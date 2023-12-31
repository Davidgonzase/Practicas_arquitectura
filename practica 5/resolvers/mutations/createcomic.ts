import ComicSchema from "../../db/dbscomic.ts"
import { ComicModel } from "../../db/dbscomic.ts";
import { GraphQLError } from "graphql";

const createcomic = async (titulo:string,descripcion:string,formato:string):Promise<ComicModel> => {
    try{
        if(!titulo||!descripcion||!formato)throw new Error("1")
        const ncomic = new ComicSchema;
        ncomic.titulo=titulo
        ncomic.descripcion=descripcion
        ncomic.formato=formato
        if(!ncomic.id)throw new Error("2")
        ncomic.save()
        return ncomic
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

export default createcomic