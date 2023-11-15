import {Request, Response} from "npm:express@4.18.2"
import PersonModel from "../db/personschema.ts";

const deleteperson = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        if(!id){
            res.status(400).send("Falta el id")
            return;
        }
        try {
            await dperson(id)
            res.status(200).send("Persona borrada")
        } catch (error) {
            res.status(400).send("Persona no encontrada")
            return;
        }
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export const dperson = async (id:string)=>{
    await PersonModel.findByIdAndRemove({_id:id}).exec();
} 

export default deleteperson