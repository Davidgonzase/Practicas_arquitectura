import ComicSchema from "../../db/dbscomic.ts"
import ColeccionSchema from "../../db/dbcoleccion.ts"
import { GraphQLError } from "graphql";

const deletecomic = async (idcomic:string):Promise<string> => {
    try{
        if(!idcomic)throw new Error("1");
        let res;
        try {
            res= await ComicSchema.findByIdAndDelete({_id:idcomic}).exec()
        } catch (error) {
            console.log(error.message)
            throw new Error("2")
        }
        if(!res)throw new Error("2");
        try {
            const rem = await ColeccionSchema.find({comics:idcomic}).exec()
            rem.forEach(i=>i.comics.filter(elem=>{return elem != idcomic}))
        } catch (error) {
            console.log(error)
            throw new Error
        }
        return "Operacion efectuada"
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

export default deletecomic