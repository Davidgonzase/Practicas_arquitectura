import {Request, Response} from "npm:express@4.18.2"
import PlanetModel from "../db/plntschema.ts"

const obtainplanets = async (req: Request, res: Response) => {
    try{
        const Planets= await PlanetModel.find({}).populate({
            path: 'personas'
        }
        )
        if(!Planets){
            res.status(404).status("No se encuentran dimensiones")
            return;
        }
        res.status(200).send(Planets.map(i=>{return{
            nombre:i.nombre,
            id:i._id,
            personas:i.personas.map(i=>{return{
                nombre:i.nombre,
                id:i._id,
            }})
        }}))
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default obtainplanets