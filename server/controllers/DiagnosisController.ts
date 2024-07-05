import { Router, Request, Response } from "express";
import { pgClient } from "../pgCLients";
import { DiagnosisService } from "../services/diagnosisService";

export const diagnosisRouter = Router();

export class DiagnosisController {
  router = Router();
  constructor(private diagnosisServices: DiagnosisService) {
    this.router.get("/getDiagnosis/:id", this.getDiagnosis);
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
}
