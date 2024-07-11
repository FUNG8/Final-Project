
import { PatientProfileService } from "../services/patientProfileService";
import express, { Router, Request, Response, response } from "express";
import { checkToken } from "../utils/patientGuard";
import { pgClient } from "../pgCLients";

export class PatientProfileController {
  router = express.Router();

  constructor(private patientProfileService: PatientProfileService) {
    this.router.get("/profilePage", checkToken, this.profilePage);
    this.router.get("/patientTicketNumber", checkToken, this.patientTicketNumber);

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
        message: "success",
        data: details
      });
    } catch (error) {
      console.error("Error fetching patient details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  patientTicketNumber = async (req: Request, res: Response) => {
    try {
      const hkid = req.body.hkid;
      console.log("HKID quick show meeeeeee nowwwww", hkid);

      if (!hkid) {
        res.status(400).json({ message: "HKID is missing" });
        return;
      }

      const patientTicketNumber = (await pgClient.query('select * from tickets join patient on tickets.patient_id = patient.id WHERE hkid = $1;', [hkid])).rows[0]

      res.json(patientTicketNumber)
    } catch (error) {
      console.error("Error fetching patient details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };





}

