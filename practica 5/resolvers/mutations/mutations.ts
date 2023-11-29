import { Usuario, comic } from "../../types.ts";

export const Mutation ={
    createuser:(_: unknown, args: {nombre:string,correoElectronico:string}):Promise<Usuario> => {
        return;
    },
    createcomic:(_: unknown, args: {titulo:string,descripcion:string,formato:string}):Promise<comic> => {

    },
    addcomictocolection:(_: unknown, args: {idcomic:string,idcolection:string}):Promise<String> => {

    },
    deletecomicrelation:(_: unknown, args: {idcomic:string,idcolection:string}):Promise<String> => {

    },
    updatecomic:(_: unknown, args: {id:string,titulo:string,descripcion:string,formato:string}):Promise<comic> => {

    },
    updateuser:(_: unknown, args: {id:string,nombre:string,correoElectronico:string}):Promise<Usuario> => {

    },
    deletecomic:(_: unknown, args: { id: string }):Promise<String> => {

    },
    deleteuser:(_: unknown, args: { id: string }):Promise<String> => {

    },
};