import {Request, Response} from "npm:express@4.18.2"
import DimensionModel from "../db/dimschema.ts"
import {dplanet} from "./delete_planetas.ts";


const deletedim = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        if(!id){
            res.status(400).send("Falta el id")
            return;
        }
        try {
            await ddim(id)
            res.status(200).send("Dimension borrada")
        } catch (error) {
            res.status(400).send("Dimension no encontrada")
            return;
        }
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export const ddim = async (id:string)=>{
    const dim=await DimensionModel.findByIdAndRemove({_id:id}).populate({
        path : 'planetas'
    }).exec(); 
    dim?.planetas.forEach(i=>{
        dplanet(i.id)
    })
} 

export default deletedim