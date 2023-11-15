import {Request, Response} from "npm:express@4.18.2"
import PersonModel from "../db/personschema.ts";

export const updateperson = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre} = req.body;
    if(!nombre){
        res.status(404).send("Faltan campos");
        return; 
    }
    const persona = await PersonModel.findById({ _id:id });
    if (!persona) {
      res.status(404).send("No se ha encontrado la persona");
      return;
    }
    persona.nombre = nombre || persona.nombre;
    persona.save()
    res.status(400).send(persona)
}

export default updateperson	