import { Router, Request, Response } from "express";
import { pgClient } from "../pgCLients";
import { DiagnosisService } from "../services/diagnosisService";

export const diagnosisRouter = Router();

export class DiagnosisController {
  router = Router();
  constructor(private diagnosisServices: DiagnosisService) {
    this.router.get("/getDiagnosis/:id", this.getDiagnosis);
    this.router.post("/postDiagnosis/:id", this.PostDiagnosis);

  }

  getDiagnosis = async (req: Request, res: Response) => {
    try {
      let patient_id = req.params.id;
      const diagnosisResult = await this.diagnosisServices.getDiagnosis(patient_id);
      console.log(diagnosisResult)
      res.json(diagnosisResult);
    } catch (e) {
      res.status(500);
      console.log("Error Getting Diagnosis History");
    }
  };

  PostDiagnosis = async (req: Request, res: Response) => {
    try {
      let patient_id = req.params.id;

      let {
        medicine_id,
        symptoms,
        diagnosis_remarks,
        created_at,
        unit_measurement,
        total_quantity,
        method,
        period_day,
        period_hr,
        frequency_per_day,
        dosage_per_serving,
        remarks
      } = req.body

      const diagnosisResult = await pgClient.query('INSERT INTO diagnosis (name,remarks,created_at,doctor_id,patient_id) VALUES($1,$2,$3,$4,$5)',[symptoms,diagnosis_remarks,created_at,'1',patient_id])
      let NewDiagnosisId = diagnosisResult.rows[0].id
      const instructionsResult = await pgClient.query('INSERT INTO drug_instruction (medicine_id,unit_measurement,diagnosis_id,total_quantity,method,period_day,period_hr,frequency_per_day,dosage_per_serving,remarks) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[medicine_id,unit_measurement,NewDiagnosisId,total_quantity,method,period_day,period_hr,frequency_per_day,dosage_per_serving,remarks] )

      console.log("this is diagnosisResult!!",diagnosisResult)
      console.log("this is instructionsResult!!!!",instructionsResult)

      res.json({messege: "Successfully Inserted"});
    } catch (e) {
      res.status(500);
      console.log("Error Getting Diagnosis History");
    }
  };





}
