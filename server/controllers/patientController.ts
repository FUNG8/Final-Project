import { Router, Request, Response } from "express";
import { pgClient } from "../pgCLients";
import { PatientService } from "../services/patientService";

export const patientRouter = Router();



export class PatientController {
    router = Router();
    constructor(private patientSerivice: PatientService) {
        this.router.get("/searchPatients", this.searchPatients);
        this.router.get("/showPatients", this.showPatients);
        this.router.post("/editPatients", this.editPatients);

    }

    searchPatients = async (req: Request, res: Response) => {
        try {
            let queryString = `SELECT * FROM patient`
            console.log("check req query", req.query)
            let pageNumber: number = parseInt(req.query.pageNumber as string);
            const perPage = 20;

            let totalPatients = (await pgClient.query(`SELECT COUNT(*) FROM patient;`)).rows[0].count
            let totalPages = Math.ceil(totalPatients / perPage);


            const currentPage = pageNumber; // Replace with the actual current page value
            const startIndex = (currentPage - 1) * perPage;

            const searchTerm: any = req.query.searchTerm


            if (searchTerm) {
                if (isNaN(searchTerm)) {
                    console.log("query is string")
                    queryString += ` WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1 OR SIMILARITY("hkid",'${searchTerm}') > 0.65`
                    totalPatients = `SELECT COUNT(*) FROM patient WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1`
                    totalPages = Math.ceil(totalPatients / perPage);
                    console.log(totalPages)
                }

            }

            queryString += ` OFFSET $1 LIMIT $2`
            console.log(queryString)
            let patientResult = (await pgClient.query(queryString, [startIndex, perPage])).rows;
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
            console.log("what's the edit shown", req.query)
            // const patientId = req.query.patientId
            // const editPatientDetails = (await pgClient.query(`UPDATE patient SET 'firstName' = ${}, 'lastName' = ${}, 'gender' = ${}, 'blood' = ${}, 'hkid' = ${}, 'birth_date' = ${}, 'phone_number' = ${}, 'emergency_name' = ${}, 'emergency_contact' = ${} WHERE id = ${patientId};`)).rows
            // console.log(editPatientDetails)

            res.json();
        } catch (e) {
            res.status(500);
            console.log("Error showing Patient Info");
        }
    }






}

