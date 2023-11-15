import {Request, Response} from "npm:express@4.18.2"
import Tardismodel from "../db/tardisschema.ts"

export const updatetardis = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {camuflaje,año,regen_num,dimensiones} = req.body;
    if(!camuflaje&&!año&&!regen_num&&!dimensiones){
        res.status(404).send("Faltan campos");
        return; 
    }
    const tardis = await Tardismodel.findById({ _id:id });
    if (!tardis) {
      res.status(404).send("No se ha encontrado el planeta");
      return;
    }
    tardis.camuflaje = camuflaje || tardis.camuflaje;
    tardis.año = año || tardis.año
    tardis.regen_num = regen_num || tardis.regen_num
    tardis.dimensiones= dimensiones || tardis.dimensiones
    tardis.save()
    res.status(400).send(tardis)
}

export default updatetardis