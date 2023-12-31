import { GraphQLError } from "graphql";
import { UsuarioModel } from "../db/dbusuario.ts";
import ColeccionSchema,{ ColeccionModel } from "../db/dbcoleccion.ts";

export const Usuario = { //Cuando se llame al Usuario se buscan los comics en base al padre
  coleccioncomics: async (parent:UsuarioModel):Promise<ColeccionModel> => {
    const res = await ColeccionSchema.findById({_id:parent.coleccion}).exec()
    if(!res){
      throw new GraphQLError(`Internal API error`, {
        extensions: { code: "INTERNAL_ERROR" },
      });
    }
    return res;
  }
};
