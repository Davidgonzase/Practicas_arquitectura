import {Request, Response} from "npm:express@4.18.2"
import DimensionModel from "../db/dimschema.ts"
import Tardismodel from "../db/tardisschema.ts"

const newdim = async (req: Request, res: Response) => {
    try{
        const {nombre,id_tardis}=req.body
        if(!nombre||!id_tardis){
            res.status(400).status("Faltan variables")
            return;    
        }
        const Tardis= await Tardismodel.findById(id_tardis)
        if(!Tardis){
            res.status(404).status("No se encuentra la TARDIS")
            return;
        }
        const array=Tardis.dimensiones
        const emptyarr:string[]=[]
        const newdim = new DimensionModel({nombre,emptyarr})
        await newdim.save();
        array.push(newdim.id)
        await Tardismodel.findByIdAndUpdate(
            {_id:id_tardis},
            {camuflaje:Tardis.camuflaje,regen_num:Tardis.regen_num,año:Tardis.año,dimensiones:array},
            {new: true}
        ).exec()
        res.status(200).send({
            nombre:newdim.nombre,
            id:newdim.id
        })
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default newdim