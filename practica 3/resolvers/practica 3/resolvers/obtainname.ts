import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoschema.ts";

const obtainname = async (req: Request, res: Response) => {
  try {
    //Pedimos el name para la busqueda 
    const name=req.params.name;
    if (!name) {
        res.status(400).send("Falta Name");
        return;
    }
    //buscamos por nombre en mongo, saltamos error si no encuentra
    const discos = await DiscoModel.find({nombre:name}).exec();
    if (discos.length===0) {
      res.status(404).send("Disco no encontrado");
      return;
    }
    //mostramos los resultados por pantalla
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

export default obtainname;