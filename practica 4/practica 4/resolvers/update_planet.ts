import {Request, Response} from "npm:express@4.18.2"
import PlanetModel from "../db/plntschema.ts"

export const updateplnt = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre,newpeople} = req.body;
    if(!nombre&&!newpeople){
        res.status(404).send("Faltan campos");
        return; 
    }
    const plnt = await PlanetModel.findById({ _id:id });
    if (!plnt) {
      res.status(404).send("No se ha encontrado el planeta");
      return;
    }
    plnt.nombre = nombre || plnt.nombre;
    plnt.personas = newpeople || plnt.personas
    plnt.save()
    res.status(400).send(plnt)
}

export default updateplnt	