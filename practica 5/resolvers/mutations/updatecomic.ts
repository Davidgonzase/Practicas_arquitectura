import ComicSchema from "../../db/dbscomic.ts"
import { ComicModel } from "../../db/dbscomic.ts";
import { GraphQLError } from "graphql";

const updatecomic = async (idcomic:string,titulo:string,descripcion:string,formato:string):Promise<ComicModel> => {
    try{
        if(!idcomic)throw new Error("1")
        let comic
        try {
            comic = await ComicSchema.findById({_id:idcomic}).exec()
        } catch (error) {
            console.log(error.message)
            throw new Error("2")
        }
        if(!comic)throw new Error("2")
        comic.titulo = titulo || comic.titulo
        comic.descripcion = descripcion || comic.descripcion
        comic.formato = formato || comic.formato
        comic.save()
        return comic
    }catch(error){
        switch(error.message){
            case "1":
                throw new GraphQLError(`Some parameters are missing`, {
                    extensions: { code: "NOT_COMPLETE" },
                });
            case "2":
                throw new GraphQLError(`No Comic found with id ${idcomic}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            default:
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default updatecomic