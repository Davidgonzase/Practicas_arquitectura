import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../disco.ts";
import { types } from "../discotype.ts";

const newdisc = async (req: Request, res: Response) => {
  try {
    //Conseguimos todos los recursos del body y comprobamos el type
    const {nombre,autor,type,matriz,pais_de_impresion,arte_de_portada} = req.body;
    if (!nombre||!autor||!type||!matriz||!pais_de_impresion||!arte_de_portada) {
      res.status(400).send("Faltan variables");
      return;
    }
    if(!Object.values(types).includes(type)){
      res.status(400).send("Tipo incorrecto tipos:" + Object.values(types))
      return;
    }

    /*
    IMAGEN A BASE 64
    NO LO HE IMPLEMENTADO POR MIEDO A LA BASE DE DATOS
    EL CONCEPTO ES PASAR UNA IMAGEN QUE ESTE EN UN HTTPS 
    OBTENER EL CONTENIDO DE ESTE Y PASRLO A BASE 64 
    PARA PASARLO A BASE 64 DIVIDIMOS EL ARRAY EN CARACTERES
    Y LUEGO CON ESA FUNCION COGER EL CONJUNTO DE CARACTERES Y PASARLO A BASE 64

    let base64String
    fetch(arte_de_portada).then(async (response) => {
      if (response.ok) {
          const imagenData = new Uint8Array(await response.arrayBuffer());
          let base = '';
          imagenData.forEach((i) => {
              base += String.fromCharCode(i);
          });
          base64String = btoa(base);
      } else {
          console.error("Image not found");
      }
    }).catch(error => {
      console.error('Error:', error);
    })

    */

    //subimos a la bd el nuevo disco
    const newdisc = new DiscoModel({nombre,autor,type,matriz,pais_de_impresion,arte_de_portada});
    await newdisc.save();
    //mostramos el resultado
    res.status(200).send({
      nombre:newdisc.nombre,
      autor:newdisc.autor,
      type:newdisc.type,
      matriz:newdisc.matriz,
      pais_de_impresion:newdisc.pais_de_impresion,
      arte_de_portada:newdisc.arte_de_portada,
      id:newdisc.id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default newdisc;
