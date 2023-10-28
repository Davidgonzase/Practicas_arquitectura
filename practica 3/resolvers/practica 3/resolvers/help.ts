import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoschema.ts";
import { types } from "../discotype.ts";

const help = async (req:Request,res:Response)=>{
    res.send("Endpints disponibles: \n"
            +"/obtain=>Todos los elementos\n"
            +"/obtain/name/:name=>Elementos por nombre\n"
            +"/obtain/id/:id=>Elementos por id\n"
            +"/obtain/type/:type=>Elementos por tipo\n"
            +"/obtain/country/:country=>Elementos por pais\n"
            +"/newdisc Nuevo disco ##Requiere body JSON\n"
            +"/updatedisc Actualizar disco ##Requiere body JSON\n"
            +"/deledisc/:id Borrar disco\n"
            +"formato:nombre,autor,type,matriz,pais_de_impresion,arte_de_portada\n"
            +"Formatos validos: "+Object.values(types)
    )
}

export default help