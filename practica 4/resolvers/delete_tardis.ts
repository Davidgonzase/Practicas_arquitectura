import {Request, Response} from "npm:express@4.18.2"
import Tardismodel from "../db/tardisschema.ts"
import { ddim } from "./delete_dimension.ts";

const deletetardis = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        if(!id){
            res.status(400).send("Falta el id")
            return;
        }
        try {
            const tardis=await Tardismodel.findByIdAndRemove({_id:id}).populate({path : 'dimensiones'}).exec()
            if(!tardis){
                res.status(404).send("No se encuentra Tardis")
                return
            }
            tardis?.dimensiones.forEach(i=>{console.log(i.id),ddim(i.id)})
            res.status(200).send("Tardis borrada")
        } catch (error) {
            res.status(400).send(error.message)
            return;
        }
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default deletetardis