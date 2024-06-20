import { Router,Request,Response } from "express";
import { pgClient } from "../pgCLients";

export const patientRouter = Router();

patientRouter.get("/allPatients" ,allPatients);
patientRouter.post("/addPatients" ,addPatients);


async function allPatients(req:Request,res:Response) {
    try{
        let patientResult = (await pgClient.query(`Select * from patient`)).rows;
        res.json(patientResult)
        

    }catch(e){
        res.status(500);
        console.log("Error Getting Patient Info")
    }
    
}

async function  addPatients(req:Request,res:Response) {
    try{
        let patientResult = await pgClient.query(`INSERT INTO patient (
    register_id,
    name,
    password,
    hkid,
    birth_date,
    phone_number,
    diagnosis_id,
    emergency_name,
    emergency_contact,
    updated_at,
    created_at)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`)

    }catch(e){
        res.status(500);
        console.log("Error adding Patient Info")
    }
    
}