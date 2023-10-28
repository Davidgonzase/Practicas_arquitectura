import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoschema.ts";
import { disco } from "../discotype.ts";

const obtain = async (req: Request, res: Response) => {
  try {
    //Buscamos todos los argumentos en la bd
    const discos = await DiscoModel.find({}).exec();
    //organizamos los resultados
    if (!discos) {
      res.status(404).send("No hay discos");
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

export default obtain;