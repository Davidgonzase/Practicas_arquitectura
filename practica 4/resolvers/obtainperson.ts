import {Request, Response} from "npm:express@4.18.2"
import PersonModel from "../db/personschema.ts"

const obtainperson = async (req: Request, res: Response) => {
    try{
        const Persons= await PersonModel.find({})
        if(!Persons){
            res.status(404).status("No se encuentran personas")
            return;
        }
        res.status(200).send(Persons.map(i=>{return{
            nombre:i.nombre,
            id:i.id
        }}));
    }catch(error){
        res.status(500).send(error.message)
        return;
    }
}

export default obtainperson