import {Request, Response} from "npm:express@4.18.2"
import PlanetModel from "../db/plntschema.ts"
import { dperson } from "./delete_person.ts";

const deleteplanet = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        if(!id){
            res.status(400).send("Falta el id")
            return;
        }
        try {
            dplanet(id)
            res.status(200).send("Persona borrada")
        } catch (error) {
            res.status(400).send("Persona no encontrada")
            return;
        }
        await dperson(id)
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export const dplanet = async (id:string)=>{
    const planet=await PlanetModel.findByIdAndRemove({_id:id}).populate({
        path : 'personas',
    }).exec(); 
    planet?.personas.forEach(i=>{
        dperson(i.id)
    })
} 

export default deleteplanet