import UsuarioSchema from "../../db/dbusuario.ts"
import { Usuario } from "../../types.ts";
import { GraphQLError } from "graphql";

const obtainusers = async ():Promise<Usuario[]> => {
    try{
        const res = await UsuarioSchema.find({}).populate({
            path : 'coleccioncomics',
            populate : {
                path : 'comics',
            }
        });

        if(!res)throw Error;
        const users:Usuario[]=res.map(i=>{return{
            nombre:i.nombre,
            correoElectronico:i.correoElectronico,
            id:i._id,
            coleccioncomics:{
                nombre:i.coleccioncomics.nombre,
                id:i.coleccioncomics._id,
                comics:i.coleccioncomics.comics.map(j=>{return{
                    titulo:j.titulo,
                    id:j._id,
                    descripcion:j.descripcion,
                    formato:j.descripcion
                }})
            }
        }})

        return users;
    }catch(error){
        throw new GraphQLError(`Intertal database error`, {
            extensions: { code: "DB_ERROR" },
        });
    }
}

export default obtainusers