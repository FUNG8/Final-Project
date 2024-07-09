import { Router, Request, Response } from "express";
import { HomePatientService } from "../services/HomePatientService";
import { pgClient } from "../pgCLients";

export const HomePatient = Router();

export class HomePatientController {
  router = Router();
  constructor(private homePatientService: HomePatientService) {
    this.router.get("/allWaitingList", this.allWaitingList);
    this.router.post("/patientNameforWaitingList/:id", this.InsertIntoWaitingList);
    this.router.get("/patientWaitingList", this.patientWaitingList);
    // this.router.get("/patientWaitingTime", this.patientWaitingTime);


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


  InsertIntoWaitingList = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.body;
      console.log("what's that broooo finallll", patientId);

      //find out the MAX number of the ticket Number of the tickets table at the moment so to increase one to insert into the next patient ticket number.
      let ticketNumber = (await pgClient.query(`SELECT MAX(ticket_number) from tickets`)).rows[0].max
      console.log("what is the ticketnumber at the moment:", ticketNumber)
      let NewTicketNumber = ticketNumber + 1
      console.log("can you show me the new ticket number:", NewTicketNumber)
      let AssigningTicket = await pgClient.query(`INSERT INTO tickets (patient_id, ticket_number) VALUES ($1,$2);`, [patientId, NewTicketNumber])
      console.log("you've inserted into queue!!!!", AssigningTicket)

      // find out how many patients that the status are waiting and consulting at the moment, then inserting into queue position
      let theLastTicketNumebr = (await pgClient.query(`SELECT COUNT(*) from tickets where status = 'waiting' OR status = 'consulting';`)).rows[0].count
      let ticketId = (await pgClient.query(`SELECT MAX(id) from tickets;`)).rows[0].max
      let newTicketId =+ ticketId
      let queuePosition = await pgClient.query(`INSERT INTO queue (ticket_id,queue_position) VALUES ($1,$2);`, [newTicketId, theLastTicketNumebr])
      console.log("does it successully insert into queuePosition????", queuePosition)

      const response = {
        message: "Patient inserted successfully",
        response: {
          Queue_position: queuePosition,
          WaitingNumber: newTicketId
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  patientWaitingList = async (req: Request, res: Response) => {
    try {
      const waitingQueueName = (await pgClient.query('select "firstName","lastName","timestamp","ticket_number",tickets.id,queue_position from patient join tickets on patient.id = tickets.patient_id join queue on queue.ticket_id = tickets.id ;')).rows
      console.log("this is patient Name on the ticket table", waitingQueueName)

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

  // patientWaitingTime = async (req: Request, res: Response) => {
  //   try {
  //     const waitingTime = (await pgClient.query('select "timestamp" from tickets;')).rows
  //     console.log("this is patient waitingTime on the queue",waitingTime)

  //     if (!waitingTime) {
  //       res.status(404).json({ message: "No waitingTime details found" });
  //       return;
  //     }

  //     res.status(200).json({
  //       message: "success",
  //       data: waitingTime
  //     });
  //   } catch (error) {
  //     console.error("Error fetching waiting list:", error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }

  // }



}
