import { Request, Response } from "npm:express@4.18.2";
import DiscoModel from "../discoSchema.ts";

const deletedisc = async (req:Request,res:Response)=>{
    try{
        //solicitamos el id
        const id=req.params.id;
        if(!id){
            res.status(400).send("Falta el id")
            return;
        }
        //buscamos y borramos en la bd
        try {
            const disc=await DiscoModel.findByIdAndRemove({_id:id}).exec(); 
            res.status(200).send("Disco borrado")
        } catch (error) {
            res.status(400).send("Disco no encontrado")
            return;
        }
    }catch(error){
        res.status(400).send(error.message)
        return;
    }
}

export default deletedisc