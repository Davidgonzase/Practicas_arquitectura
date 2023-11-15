import {Request, Response} from "npm:express@4.18.2"
import Tardismodel from "../db/tardisschema.ts"

const obtain = async (req: Request, res: Response) => {
    try{
        // const Tardis= await Tardismodel.find({}).populate('dimensiones').populate("dimensiones.planetas")
        const Tardis= await Tardismodel.find({}).populate({
            path : 'dimensiones',
            populate : {
                path : 'planetas',
                populate:{
                    path: 'personas'
                }
            }
        })

        if(!Tardis){
            res.status(404).status("No se encuentra la Tardis")
            return;
        }
        res.status(200).send(Tardis.map(i=>{return{
            nombre:i.camuflaje,
            regen_num:i.regen_num,
            año:i.año,
            dimensiones:i.dimensiones.map(i=>{return{
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
            }}),
            id:i.id
        }}));
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default obtain