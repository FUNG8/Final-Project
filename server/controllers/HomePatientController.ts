import { Router, Request, Response } from "express";
import { HomePatientService } from "../services/HomePatientService";
import { pgClient } from "../pgCLients";

export const HomePatient = Router();

export class HomePatientController {
  router = Router();
  constructor(private homePatientService: HomePatientService) {
    this.router.get("/allWaitingList", this.allWaitingList);
    this.router.post("/patientNameforWaitingList/:id", this.patientNameforWaitingList);
    this.router.get("/patientWaitingList", this.patientWaitingList);

  }

  allWaitingList = async (req: Request, res: Response) => {
    try {
      const waitingQueue = (await pgClient.query('Select COUNT(*) from tickets;')).rows[0]

      if (!waitingQueue) {
        res.status(404).json({ message: "No patient details found" });
        return;
      }

      res.status(200).json({
        message: "success",
        data: waitingQueue
      });
    } catch (error) {
      console.error("Error fetching waiting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }


  patientNameforWaitingList = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.body;
      console.log("what's that broooo finallll", patientId);
  
      let InsertPatienttoQueue = await pgClient.query(`INSERT INTO tickets (patient_id) VALUES ($1);`, [patientId]);
      console.log("this is insert successed", InsertPatienttoQueue.rows[0]);
  
      const response = {
        message: "Patient inserted successfully",
        response: InsertPatienttoQueue.rows[0],
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  patientWaitingList = async (req: Request, res: Response) => {
    try {
      const waitingQueueName = (await pgClient.query('select "firstName","lastName" from patient right join tickets on patient.id = tickets.patient_id;')).rows
      console.log("this is patient Name on the queue",waitingQueueName)

      if (!waitingQueueName) {
        res.status(404).json({ message: "No patient details found" });
        return;
      }

      res.status(200).json({
        message: "success",
        data: waitingQueueName
      });
    } catch (error) {
      console.error("Error fetching waiting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }




}
