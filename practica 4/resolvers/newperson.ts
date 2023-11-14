import {Request, Response} from "npm:express@4.18.2"
import PersonModel from "../db/personschema.ts"
import PlanetModel from "../db/plntschema.ts"

const newperson = async (req: Request, res: Response) => {
    try{
        const {nombre,id_planeta}=req.body
        if(!nombre||!id_planeta){
            res.status(400).status("Faltan variables")
            return;    
        }
        const plnt= await PlanetModel.findById(id_planeta)
        if(!plnt){
            res.status(404).status("No se encuentra el planeta")
            return;
        }
        const array=plnt.personas
        const newperson = new PersonModel({nombre})
        await newperson.save();
        array.push(newperson.id)
        await PlanetModel.findByIdAndUpdate(
            {_id:id_planeta},
            {nombre:plnt.nombre,personas:array},
            {new: true}
        ).exec()
        res.status(200).send({
            nombre:newperson.nombre,
            id:newperson.id
        })
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default newperson