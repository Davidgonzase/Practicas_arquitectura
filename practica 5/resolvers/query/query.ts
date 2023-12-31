import { Usuario, comic } from "../../types.ts";
import obtaincomicid from "./obtaincomicid.ts";
import obtaincomics from "./obtaincomics.ts";
import obtainuserid from "./obtainuserid.ts";
import obtainusers from "./obtainusers.ts";

export const Query ={
    getusers:():Promise<Usuario[]> => {
        return obtainusers();
    },
    getcomics:():Promise<comic[]> => {
        return obtaincomics();
    },
    getuserid:(_: unknown, args: { id: string }):Promise<Usuario> => {
        return obtainuserid(args.id);
    },
    getcomicid:(_: unknown, args: { id: string }):Promise<comic> => {
        return obtaincomicid(args.id);
    }
};