import { GraphQLError } from "graphql";
import { ColeccionModel } from "../db/dbcoleccion.ts";
import ComicSchema,{ ComicModel } from "../db/dbscomic.ts";
import { UsuarioModel } from "../db/dbusuario.ts";

export const coleccioncomics = { //Cuando se llame al Usuario se buscan los comics en base al padre
  comics: async (parent:ColeccionModel):Promise<ComicModel[]> =>{
    const comics:ComicModel[] = await parent.comics.map(async (i:string) =>{
      const res=await ComicSchema.findById({_id:i}).exec()
      if(!res){
        throw new GraphQLError(`Internal API error`, {
          extensions: { code: "INTERNAL_ERROR" },
        });
      }
      return res
    })
    if(!comics||comics==null)return [];
    return comics
  }
};