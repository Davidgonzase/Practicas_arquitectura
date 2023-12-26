import { ComicModel } from "../db/dbscomic.ts";
import { UsuarioModel } from "../db/dbusuario.ts";
import obtaincomic from "./query/obtaincomic.ts";
import obtaincomics from "./query/obtaincomics.ts";
import obtainuser from "./query/obtainuser.ts";
import obtainusers from "./query/obtainusers.ts";


export const Query ={
    getusers:async ():Promise<UsuarioModel[]> => {
        return await obtainusers();
    },
    getuser:async (_:unknown,args:{id:string}):Promise<UsuarioModel> => {
        return await obtainuser(args.id);
    },
    getcomics:async ():Promise<ComicModel[]> => {
        return await obtaincomics();
    },
    getcomic:async (_:unknown,args:{id:string}):Promise<ComicModel> => {
        return await obtaincomic(args.id);
    },
};