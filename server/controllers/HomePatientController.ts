import { Router, Request, Response } from "express";
import { HomePatientService } from "../services/HomePatientService";
import { pgClient } from "../pgCLients";

export const HomePatient = Router();

export class HomePatientController {
  router = Router();
  constructor(private homePatientService: HomePatientService) {
    this.router.get("/allWaitingList", this.allWaitingList);
    this.router.post(
      "/patientNameforWaitingList/:id",
      this.InsertIntoWaitingList
    );
    this.router.get("/patientWaitingList", this.patientWaitingList);
    this.router.get("/completedPatientNumber", this.CompletedPatientNumber);
    this.router.put("/consultingPatient", this.ConsultingPatient);
    this.router.put("/patientQueue", this.queueRearrange);
    // this.router.get("/patientWaitingTime", this.patientWaitingTime);
  }



  allWaitingList = async (req: Request, res: Response) => {
    try {
      const waitingQueue = (await pgClient.query('SELECT COUNT(status) FROM tickets WHERE status = $1;', ['waiting'])).rows[0]

      if (!waitingQueue) {
        res.status(404).json({ message: "No patient details found" });
        return;
      }

      res.status(200).json({
        message: "success",
        data: waitingQueue,
      });
    } catch (error) {
      console.error("Error fetching waiting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }

  CompletedPatientNumber = async (req: Request, res: Response) => {
    try {
      const completedQueue = (await pgClient.query('SELECT COUNT(status) FROM tickets WHERE status = $1;', ['completed'])).rows[0]
      console.log("showmeeee what's that", completedQueue)

      if (!completedQueue) {
        res.status(404).json({ message: "No patient details found" });
        return;
      }

      res.status(200).json({
        message: "success",
        data: completedQueue
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
      let ticketNumber = (
        await pgClient.query(`SELECT MAX(ticket_number) from tickets`)
      ).rows[0].max;
      console.log("what is the ticketnumber at the moment:", ticketNumber);
      let NewTicketNumber = ticketNumber + 1;
      console.log("can you show me the new ticket number:", NewTicketNumber);
      let AssigningTicket = await pgClient.query(
        `INSERT INTO tickets (patient_id, ticket_number) VALUES ($1,$2);`,
        [patientId, NewTicketNumber]
      );
      console.log("you've inserted into queue!!!!", AssigningTicket);

      // find out how many patients that the status are waiting and consulting at the moment, then inserting into queue position
      let theLastTicketNumebr = (await pgClient.query(`SELECT COUNT(*) from tickets where status = 'waiting' OR status = 'consulting';`)).rows[0].count
      let ticketId = (await pgClient.query(`SELECT MAX(id) from tickets;`)).rows[0].max
      let newTicketId = + ticketId
      let queuePosition = await pgClient.query(`INSERT INTO queue (ticket_id,queue_position) VALUES ($1,$2);`, [newTicketId, theLastTicketNumebr])
      console.log("does it successully insert into queuePosition????", queuePosition)
      // let theLastTicketNumebr = (
      //   await pgClient.query(
      //     `SELECT COUNT(*) from tickets where status = 'waiting' OR status = 'consulting';`
      //   )
      // ).rows[0].count;
      // let ticketId = (await pgClient.query(`SELECT MAX(id) from tickets;`))
      //   .rows[0].max;
      // let newTicketId = +ticketId;
      // let queuePosition = await pgClient.query(
      //   `INSERT INTO queue (ticket_id,queue_position) VALUES ($1,$2);`,
      //   [newTicketId, theLastTicketNumebr]
      // );
      // console.log(
      //   "does it successully insert into queuePosition????",
      //   queuePosition
      // );

      const response = {
        message: "Patient inserted successfully",
        response: {
          Queue_position: queuePosition,
          WaitingNumber: newTicketId,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  patientWaitingList = async (req: Request, res: Response) => {
    try {
      const waitingQueueName = (await pgClient.query('select "firstName","lastName","timestamp","ticket_number",tickets.id as ticket_id,queue_position,status from patient join tickets on patient.id = tickets.patient_id join queue on queue.ticket_id = tickets.id ORDER BY queue_position;')).rows
      // const waitingQueueName = (
      //   await pgClient.query(
      //     'select "firstName","lastName","timestamp","ticket_number",tickets.id as ticket_id,queue_position from patient join tickets on patient.id = tickets.patient_id join queue on queue.ticket_id = tickets.id order by queue_position;'
      //   )
      // ).rows;
      console.log("this is patient Name on the ticket table", waitingQueueName);

      if (!waitingQueueName) {
        res.status(404).json({ message: "No patient details found" });
        return;
      }

      res.status(200).json({
        message: "success",
        data: waitingQueueName,
      });
    } catch (error) {
      console.error("Error fetching waiting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



  queueRearrange = async (req: Request, res: Response) => {
    const { tickets } = req.body; // Array of ticket ids and new positions
    console.log(tickets);
    try {
      await pgClient.query("BEGIN");
      for (let i = 0; i < tickets.length; i++) {
        await pgClient.query(
          "UPDATE queue SET queue_position = $1 WHERE ticket_id = $2",
          [tickets[i].queue_position, tickets[i].ticket_id]
        );
      }
      await pgClient.query("COMMIT");
      res.status(200).json({ message: "Queue rearranged successfully" });
    } catch (err: any) {
      console.log(err);
      await pgClient.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    }
  };

  ConsultingPatient = async (req: Request, res: Response) => {
    try {
      // looking for the next patient on the top of the waiting list
      const NextConsultingPatient = (await pgClient.query('select "firstName","lastName","timestamp","ticket_number",tickets.id,queue_position,status from patient join tickets on patient.id = tickets.patient_id join queue on queue.ticket_id = tickets.id ORDER BY queue_position;')).rows

      const theFirstPatientIdFromWaitingList = NextConsultingPatient[0].id



      // Remove the ticket from the queue if there are patients in the waiting list
      if (NextConsultingPatient[0].status = 'consulting') {
        await pgClient.query('UPDATE tickets SET status = $1 WHERE id = $2', ["completed", theFirstPatientIdFromWaitingList]);
        await pgClient.query('DELETE FROM queue WHERE ticket_id = $1', [theFirstPatientIdFromWaitingList]);
        // Reassign queue positions for the remaining tickets
        const result = await pgClient.query('SELECT id FROM queue ORDER BY queue_position ASC');
        if (NextConsultingPatient.length > 1) {
          let theSecPatientIdFromWaitingList = NextConsultingPatient[1].id

          if (NextConsultingPatient[1].status = "waiting") {
            await pgClient.query('UPDATE tickets SET status = $1 WHERE id = $2', ["consulting", theSecPatientIdFromWaitingList]);
          }
          for (let i = 0; i < result.rows.length; i++) {
            await pgClient.query('UPDATE queue SET queue_position = $1 WHERE id = $2', [i + 1, result.rows[i].id]);
          }
        }

      }

      // if (!NextConsultingPatient) {
      //   res.status(404).json({ message: "No patient details found" });
      //   return;
      // }

      res.status(200).json({
        message: "success",
        // NextConsultingPatient
      });
    } catch (error) {
      console.error("Error fetching waiting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }
}






// patientWaitingTime = async (req: Request, res: Response) => {
//   try {
//     const waitingTime = (await pgClient.query('select "timestamp" from tickets;')).rows
//     console.log("this is patient waitingTime on the queue",waitingTime)


