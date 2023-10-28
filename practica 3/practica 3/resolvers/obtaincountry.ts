import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoSchema.ts";

const obtaincountry = async (req: Request, res: Response) => {
  try {
    //conseguimos el pais
    const country=req.params.country;
    if (!country) {
        res.status(400).send("Falta Pais");
        return;
    }
    //buscamos en la bd
    const discos = await DiscoModel.find({pais_de_impresion:country}).exec();
    //organizamos los resultados
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

export default obtaincountry;