import {Request, Response} from "npm:express@4.18.2"
import DimensionModel from "../db/dimschema.ts"

export const updatedim = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre,newplanets} = req.body;
    if(!nombre&&!newplanets){
        res.status(404).send("Faltan campos");
        return; 
    }
    const dim = await DimensionModel.findById({ _id:id });
    if (!dim) {
      res.status(404).send("No se ha encontrado la dimension");
      return;
    }
    dim.nombre = nombre || dim.nombre;
    dim.planetas = newplanets || dim.planetas
    dim.save()
    res.status(400).send(dim)
}

export default updatedim