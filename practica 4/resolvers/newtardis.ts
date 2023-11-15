import {Request, Response} from "npm:express@4.18.2"
import Tardismodel from "../db/tardisschema.ts"

const newtardis = async (req: Request, res: Response) => {
    try{
        const {camuflaje,regen_num,año}=req.body
        if(!camuflaje||!regen_num||!año){
            res.status(400).status("Faltan variables")
            return;    
        }
        const newptardis = new Tardismodel({camuflaje,regen_num,año})
        await newptardis.save();
        res.status(200).send({
            nombre:newptardis.camuflaje,
            regen_num:newptardis.regen_num,
            año:newptardis.año,
            dimensiones:newptardis.dimensiones,
            id:newptardis.id
        })
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default newtardis