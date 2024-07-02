import { Knex } from "knex";
import { PatientProfileService } from "../services/patientProfileService";
import express, { Router, Request, Response, response } from "express";
import { checkToken } from "../utils/patientGuard";

export class PatientProfileController {
    router = express.Router();
  
    constructor(private patientProfileService: PatientProfileService) {
      this.router.get("/profilePage", checkToken, this.profilePage);
    }
  
    profilePage = async (req: Request, res: Response) => {
      try {
        const hkid = req.body.hkid;
        console.log("HKID from token:", hkid); // Debug log
  
        if (!hkid) {
          res.status(400).json({ message: "HKID is missing" });
          return;
        }
  
        const details = await this.patientProfileService.PatientDetails(hkid);
  
        if (!details) {
          res.status(404).json({ message: "No patient details found" });
          return;
        }
  
        res.status(200).json({
          message: `
            First Name: ${details.firstName},
            Last Name: ${details.lastName}, 
            Birth: ${details.birth_date}, 
            Gender: ${details.gender}, 
            Phone: ${details.phone_number}, 
            Emergency Contact: ${details.emergency_contact}, 
            Emergency Name: ${details.emergency_name}
          `,
          data: details
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  }

