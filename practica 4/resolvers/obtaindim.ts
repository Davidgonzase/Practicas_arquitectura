import {Request, Response} from "npm:express@4.18.2"
import DimensionModel from "../db/dimschema.ts"

const obtaindims = async (req: Request, res: Response) => {
    try{
        const Dimensions= await DimensionModel.find({}).populate({
            path : 'planetas',
            populate:{
                path: 'personas'
            }
        }
        )
        if(!Dimensions){
            res.status(404).status("No se encuentran dimensiones")
            return;
        }
        res.status(200).send(Dimensions.map(i=>{return{
            nombre:i.nombre,
            id:i._id,
                planetas:i.planetas.map(i=>{return{
                    nombre:i.nombre,
                    id:i._id,
                    personas:i.personas.map(i=>{return{
                        nombre:i.nombre,
                        id:i._id,
                    }
                    })
                }})
        }}));
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default obtaindims