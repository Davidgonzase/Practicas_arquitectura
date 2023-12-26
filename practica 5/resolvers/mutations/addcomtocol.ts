import ComicSchema from "../../db/dbscomic.ts"
import ColeccionSchema from "../../db/dbcoleccion.ts"
import { GraphQLError } from "graphql";

const addcomictocolection = async (idcomic:string,idcolection:string):Promise<string> => {
    try{
        if(!idcomic||!idcolection)throw new Error("1")
        let coleccion
        try {
            coleccion = await ColeccionSchema.findById({_id:idcolection}).exec()
        } catch (error) {
            console.log(error.message)
            throw new Error("3")
        }
        let comic
        try {
            comic = await ComicSchema.findById({_id:idcomic}).exec()
        } catch (error) {
            console.log(error.message)
            throw new Error("2")
        }
        if(!comic)throw new Error("2")
        if(!coleccion)throw new Error("3")
        coleccion.comics.push(idcomic)
        coleccion.save()
        return "Listo"
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
            case "3":
                throw new GraphQLError(`No Colection found with colection ${idcolection}`, {
                    extensions: { code: "NOT_FOUND" },
                });
            default:
                throw new GraphQLError(`Internal API error`, {
                    extensions: { code: "INTERNAL_ERROR" },
                });
        }
    }
}

export default addcomictocolection