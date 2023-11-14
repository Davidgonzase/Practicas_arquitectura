import {Request, Response} from "npm:express@4.18.2"
import DimensionModel from "../db/dimschema.ts"
import PlanetModel from "../db/plntschema.ts"

const newplanet = async (req: Request, res: Response) => {
    try{
        const {nombre,id_dimension}=req.body
        if(!nombre||!id_dimension){
            res.status(400).status("Faltan variables")
            return;    
        }
        const dim= await DimensionModel.findById(id_dimension)
        if(!dim){
            res.status(404).status("No se encuentra la dimension")
            return;
        }
        const array=dim.planetas
        const emptyarr:string[]=[]
        const newplanet = new PlanetModel({nombre,emptyarr})
        await newplanet.save();
        array.push(newplanet.id)
        await DimensionModel.findByIdAndUpdate(
            {_id:id_dimension},
            {nombre:dim.nombre,planetas:array},
            {new: true}
        ).exec()
        res.status(200).send({
            nombre:newplanet.nombre,
            id:newplanet.id
        })
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default newplanet