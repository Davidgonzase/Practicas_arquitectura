import UsuarioSchema from "../../db/dbusuario.ts"
import { Usuario } from "../../types.ts";
import { GraphQLError } from "graphql";

const obtainuserid = async (id:string):Promise<Usuario> => {
    try{
        let res;
        try {
            res = await UsuarioSchema.findById({_id:id}).populate({
                path : 'coleccioncomics',
                populate : {
                    path : 'comics',
                }
            });
            if(!res)throw Error;
        } catch (error) {
            throw new GraphQLError(`No User with id ${id} found`, {
                extensions: { code: "NOT_FOUND" },
            });
        }

        const user:Usuario={
            nombre:res.nombre,
            correoElectronico:res.correoElectronico,
            id:res._id,
            coleccioncomics:{
                nombre:res.coleccioncomics.nombre,
                id:res.coleccioncomics._id,
                comics:res.coleccioncomics.comics.map(j=>{return{
                    titulo:j.titulo,
                    id:j._id,
                    descripcion:j.descripcion,
                    formato:j.descripcion
                }})
            }
        }

        return user
    }catch(error){
        throw new GraphQLError(`Intertal database error`, {
            extensions: { code: "DB_ERROR" },
        });
    }
}

export default obtainuserid