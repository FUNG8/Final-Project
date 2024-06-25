import { Router, Request, Response } from "express";
import { pgClient } from "../pgCLients";
import { PatientService } from "../services/PatientService";

export const patientRouter = Router();



export class PatientController {
    router = Router();
    constructor(private patientSerivice: PatientService){
        this.router.get("/allPatients", this.allPatients);
        this.router.post("/addPatients", this.addPatients);
    }

    allPatients= async (req: Request, res: Response) =>{
        try {
            const pageNumber = req.query.pageNumber?.toString();
            const perPage = 20;
            const startIndex = ((pageNumber as unknown as number) - 1) * perPage;
            let patientResult = await this.patientSerivice.getPatients(startIndex, perPage)
            // let patientResult = await pgClient.query('Select * from patient;')

            res.json(patientResult);
          } catch (e) {
            res.status(500);
            console.log("Error Getting Patient Info");
          }
    }
    
   addPatients= async (req: Request, res: Response)=> {
        try {
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
    
        } catch (e) {
            res.status(500);
            console.log("Error adding Patient Info")
        }
    
    }
}

