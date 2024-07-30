import { Router, Request, Response } from "express";
// import { pgClient } from "../pgClients";
import { DiagnosisService } from "../services/DiagnosisService1";

export const diagnosisRouter = Router();

export class DiagnosisController {
  router = Router();
  constructor(private diagnosisServices: DiagnosisService) {
    this.router.get("/getDiagnosis/:id", this.getDiagnosis);
    this.router.post("/postDiagnosis/:id", this.postDiagnosis);
  }

  getDiagnosis = async (req: Request, res: Response) => {
    try {
      let patient_id = req.params.id;
      const diagnosisResult = await this.diagnosisServices.getDiagnosis(
        patient_id
      );
      // console.log(diagnosisResult);
      res.json(diagnosisResult);
    } catch (e) {
      res.status(500).json({ message: "Error Getting Diagnosis History" });
      console.error(e);
    }
  };

  postDiagnosis = async (req: Request, res: Response) => {
    console.log("reqbody", req.body);
    try {
      console.log("reqbody", req.body.d_name);
      let {
        d_name,
        d_doctor_id,
        d_patient_id,
        d_remarks,
        d_created_at,
        d_updated_at,
        demoInstructions,
      } = req.body;

      // const diagnosisResult = await pgClient.query(
      //   "INSERT INTO diagnosis (name, doctor_id, patient_id, remarks, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      //   [
      //     d_name,
      //     d_doctor_id,
      //     d_patient_id,
      //     d_remarks,
      //     d_created_at,
      //     d_updated_at,
      //   ]
      // );
      // console.log("id?",diagnosisResult.rows[0].id)

      // for (const instruction of demoInstructions) {
      //   await pgClient.query(
      //     "INSERT INTO drug_instruction (medicine_id,diagnosis_id,unit_measurement, total_quantity,method,period_day,period_hr,frequency_per_day,dosage_per_serving,remarks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      //     [
      //       instruction.medicineId,
      //       diagnosisResult.rows[0].id,
      //       instruction.unit,
      //       instruction.quantity,
      //       instruction.method,
      //       instruction.periodDay,
      //       instruction.periodHour,
      //       instruction.frequencyPerDay,
      //       instruction.dosagePerServing,
      //       instruction.remarks,

      //     ]
      //   );
      // }
      let diagnosisResult = await this.diagnosisServices.insertDiagnosis(
        d_name,
        d_doctor_id,
        d_patient_id,
        d_remarks,
        d_created_at,
        d_updated_at,
        demoInstructions
      );

      res.json({
        message: "Successfully Inserted",
        diagnosisResult: diagnosisResult.rows[0],
      });
    } catch (e) {
      res.status(500).json({ message: "Error Inserting Diagnosis" });
      console.error(e);
    }
  };
}
