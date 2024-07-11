
import express, { Router, Request, Response, response } from "express";
import { checkToken } from "../utils/patientGuard";
import { PatientDiagnosisService } from "../services/patientDiagnosisService";

export class PatientDiagnosisController {
    router = express.Router();
  
    constructor(private patientDiagnosisService: PatientDiagnosisService) {
      this.router.get("/getDiagnosis", checkToken, this.profilePage);
    }
  
    profilePage = async (req: Request, res: Response) => {
      try {
        const hkid = req.body.hkid;
        console.log("HKID from token:", hkid); 
  
        if (!hkid) {
          res.status(400).json({ message: "HKID is missing" });
          return;
        }
  
        const details = await this.patientDiagnosisService.DiagnosisDetails(hkid);
   
        
        res.status(200).json({
          message: "success",
          data: details 
        });
      } catch (error) {
        console.error("Error fetching diagnosis details:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  }

