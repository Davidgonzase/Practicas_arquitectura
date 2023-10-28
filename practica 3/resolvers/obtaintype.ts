import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../disco.ts";
import { types } from "../discotype.ts";

const obtaintype = async (req: Request, res: Response) => {
  try {
    //Cogemos el parametro del tipo y comprobamos si este pertenece a la lista type
    const type=req.params.type;
    if (!type) {
        res.status(400).send("Falta type");
        return;
    }
    if(!Object.values(types).includes(type)){
        res.status(400).send("Tipo incorrecto")
        return;
    }
    //Buscamos en mongo
    const discos = await DiscoModel.find({type}).exec();
    //Si no hay resutados mandamos codigo 404
    if (discos.length===0) {
      res.status(404).send("Disco no encontrado");
      return;
    }
    res.status(200).send(discos.map(i=>{return{
      nombre:i.nombre,
      autor:i.autor,
      type:i.type,
      matriz:i.matriz,
      pais_de_impresion:i.pais_de_impresion,
      arte_de_portada:i.arte_de_portada,
      id:i.id
    }}));
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default obtaintype;