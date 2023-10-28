import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoschema.ts";

const obtainid = async (req: Request, res: Response) => {
  try {
    //conseguimos el id
    const id=req.params.id;
    if (!id) {
        res.status(400).send("Falta id");
        return;
    }
    //buscamos en la bd
    try {
      const discos = await DiscoModel.findById(id); 
      //mostramos si lo encontramos 
      if(discos){
        res.status(200).send({
          nombre:discos.nombre,
          autor:discos.autor,
          type:discos.type,
          matriz:discos.matriz,
          pais_de_impresion:discos.pais_de_impresion,
          arte_de_portada:discos.arte_de_portada,
          id:discos.id
        })
      }
    } catch (error) {
      res.status(404).send("No se encuentra un disco")
    }
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default obtainid;