import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../disco.ts";
import { types } from "../discotype.ts";

const deletedisc=async (req:Request,res:Response)=>{
  //Solicitamos los recursos y el body, comprobamos que el tipo sea correcto
    const id=req.params.id;
    const {nombre,autor,type,matriz,pais_de_impresion,arte_de_portada} = req.body;
    if (!nombre||!autor||!type||!matriz||!pais_de_impresion||!arte_de_portada) {
      res.status(400).send("Faltan variables");
      return;
    }
    if(!Object.values(types).includes(type)){
      res.status(400).send("Tipo incorrecto tipos:" + Object.values(types))
      return;
    }
  //Buscamos por id y actualizamos
    const updated_disc = await DiscoModel.findByIdAndUpdate(
        {_id:id},
        {nombre:nombre,autor:autor,type:type,matriz:matriz,pais_de_impresion:pais_de_impresion,arte_de_portada:arte_de_portada},
        {new: true}
    ).exec()
  //Si no aparece disco lanzamos error
    if(!updated_disc){
        res.status(400).send("Disco no encontrado")
        return;
    }
  //Actualizacion correcta
    res.status(200).send({
        nombre:updated_disc.nombre,
        autor:updated_disc.autor,
        type:updated_disc.type,
        matriz:updated_disc.matriz,
        pais_de_impresion:updated_disc.pais_de_impresion,
        arte_de_portada:updated_disc.arte_de_portada,
        id:updated_disc.id
      })

}

export default deletedisc