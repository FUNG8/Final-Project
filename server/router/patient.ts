import { Router,Request,Response } from "express";
import { pgClient } from "../pgCLients";

export const patientRouter = Router();

patientRouter.get("/allPatients" ,allPatients);

async function allPatients(req:Request,res:Response) {
    try{
        let patientResult = (await pgClient.query(`Select * from patient;`));
        res.json(patientResult)
        

    }catch(e){
        res.status(500);
        console.log("Error Getting Patient Info")
    }
    
}