import { Router, Request, Response } from "express";
import { pgClient } from "../pgCLients";

export const patientRouter = Router();

patientRouter.get("/searchPatients", searchPatients);
patientRouter.post("/addPatients", addPatients);
// patientRouter.get("/searchAllPatients", searchAllPatients);



async function searchPatients(req: Request, res: Response) {
  try {
    let queryString = `SELECT * FROM patient`
    const pageNumber = req.query.pageNumber?.toString();
    const perPage = 20;
    const startIndex = ((pageNumber as unknown as number) - 1) * perPage;
    const searchTerm: any = req.query.searchTerm

    console.log("check req searchTerm", req.query.searchTerm)

    if (searchTerm) {
      if (isNaN(searchTerm)) {
        queryString += ` WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1`
      } else
        queryString += ` WHERE register_id  = ${searchTerm}  `
    }

    queryString += ` OFFSET $1 LIMIT $2`

    console.log("check query string", queryString)
    let patientResult = (await pgClient.query(queryString, [startIndex, perPage])).rows;
    res.json(patientResult);
  } catch (e) {
    res.status(500);
    console.log("Error Getting Patient Info");
  }
}

// async function searchAllPatients(req: Request, res: Response) {
//   try {
//     console.log("what is this:",req.body)
//     let patientResult = ((await pgClient.query('SELECT * FROM patient WHERE register_id = 4')).rows);
//     console.log("This is search Patient data:", patientResult)
//     res.json(patientResult);
//   } catch (e) {
//     res.status(500);
//     console.log("Error Getting Patient Info");
//   }
// }




async function addPatients(req: Request, res: Response) {
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