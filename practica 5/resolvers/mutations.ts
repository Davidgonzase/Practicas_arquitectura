import { ComicModel } from "../db/dbscomic.ts";
import { UsuarioModel } from "../db/dbusuario.ts";
import addcomictocolection from "./mutations/addcomtocol.ts";
import createcomic from "./mutations/createcomic.ts";
import createuser from "./mutations/createuser.ts";
import delcomictocolection from "./mutations/delcomtocol.ts";
import deletecomic from "./mutations/deletecomic.ts";
import deleteuser from "./mutations/deleteuser.ts";
import updatecomic from "./mutations/updatecomic.ts";
import updateuser from "./mutations/updateuser.ts";

export const Mutation ={
    createuser: async (_:unknown,args:{nombre:string,correoElectronico:string}):Promise<UsuarioModel> => {
        return await createuser(args.nombre,args.correoElectronico)
    },
    createcomic: async(_:unknown,args:{titulo:string,descripcion:string,formato:string}):Promise<ComicModel> => {
        return await createcomic(args.titulo,args.descripcion,args.formato)
    },
    addcomictocolection: async(_:unknown,args:{idcomic:string,idcolection:string}):Promise<string> =>{
        return await addcomictocolection(args.idcomic,args.idcolection)
    },
    deletecomicrelation:async(_:unknown,args:{idcomic:string,idcolection:string}):Promise<string> =>{
        return await delcomictocolection(args.idcomic,args.idcolection)
    },
    updatecomic:async(_:unknown,args:{id:string,titulo:string,descripcion:string,formato:string}):Promise<ComicModel> => {
        return await updatecomic(args.id,args.titulo,args.descripcion,args.formato)
    },
    updateuser:async(_:unknown,args:{id:string,nombre:string,correoElectronico:string}):Promise<UsuarioModel> => {
        return await updateuser(args.id,args.nombre,args.correoElectronico)
    },
    deletecomic:async(_:unknown,args:{id:string}):Promise<string> => {
        return await deletecomic(args.id)
    },
    deleteuser:async(_:unknown,args:{id:string}):Promise<string> => {
        return await deleteuser(args.id)
    }
};