import { Router, Request, Response } from "express";
import { PatientService } from "../services/patientService";
import { pgClient } from "../pgClients";

export const patientRouter = Router();



export class PatientController {
    router = Router();
    constructor(private patientSerivice: PatientService) {
        this.router.get("/searchPatients", this.searchPatients);
        this.router.get("/showPatients", this.showPatients);
        this.router.put("/editPatients", this.editPatients);
    }

    searchPatients = async (req: Request, res: Response) => {
        try {
            let queryString = `SELECT * FROM patient`
            let pageNumber: number = parseInt(req.query.pageNumber as string);
            const perPage = 20;

            let totalPatients = await this.patientSerivice.totalPatients();
            let totalPages = Math.ceil(totalPatients / perPage);

            const currentPage = pageNumber; 
            const startIndex = (currentPage - 1) * perPage;
            const searchTerm: any = req.query.searchTerm

            // if (searchTerm) {
            //     if (isNaN(searchTerm)) {
            //         queryString += ` WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1 OR SIMILARITY("hkid",'${searchTerm}') > 0.60`
            //         totalPatients = `SELECT COUNT(*) FROM patient WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1`
            //         totalPages = Math.ceil(totalPatients / perPage);
            //         console.log(totalPages)
            //     }
            // }

            // queryString += ` OFFSET $1 LIMIT $2`;


            // let patientResult = (await pgClient.query(queryString, [startIndex, perPage])).rows;
            let patientResult = await this.patientSerivice.patientResult(searchTerm,startIndex,perPage,totalPatients,totalPages);
            const response = {
                patientResult,
                totalPages: totalPages,
                currentPage: currentPage
            };

            res.json(response);
        } catch (e) {
            res.status(500);
            console.log("Error Getting Patient Info");
        }
    }


    showPatients = async (req: Request, res: Response) => {
        try {
            // console.log("what's the show button shown", req.query)
            const patientId = req.query.patientId
            const patient_soloInfo = (await pgClient.query(`SELECT * FROM patient WHERE id = ${patientId};`)).rows
            console.log(patient_soloInfo)

            res.json(patient_soloInfo);
        } catch (e) {
            res.status(500);
            console.log("Error showing Patient Info");
        }
    }

    editPatients = async (req: Request, res: Response) => {
        try {
            const patientId = req.query.patientId;
            console.log("check body", req.body)
            const { firstName, lastName, gender, blood, hkid, birth_date, phone_number, emergency_name, emergency_contact } = req.body;
            console.log("what's the firstName",req.body.phone_number)
            // Perform the necessary database update using the received data
            const editPatientDetails = await pgClient.query(
                `UPDATE patient SET 
              "firstName" = $1,
              "lastName" = $2,
              gender = $3,
              blood = $4,
              hkid = $5,
              birth_date = $6,
              phone_number = $7,
              emergency_name = $8,
              emergency_contact = $9
              WHERE id = $10`,
                [firstName, lastName, gender, blood, hkid, birth_date, phone_number, emergency_name, emergency_contact, patientId]
            );

            if (editPatientDetails.rowCount == 1) {
                res.json({ message: "update success" })

            }
            else {
                res.status(500).json({ message: "update failed" })
            }
        } catch (e) {
            res.status(500).json({ error: "Error editing Patient Info" });
            console.log("Error editing Patient Info", e);
        }
    }






}

