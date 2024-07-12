import { Knex } from "knex";
import express, { Router, Request, Response, response } from "express";
import { pgClient } from "../pgClients";
import { NotificationService } from "../services/NotificationService";

export class NotificationController {
  router = Router();

  constructor(private notificationService: NotificationService) {
    this.router.get("/showDrugInstruction/:id", this.ShowDrugInstruction);
    this.router.put("/updatedNotificationInfo/:id", this.UpdatedNotificationInfo);
    this.router.post("/newNotificationInfo/:id", this.NewNotificationInfo);
  }

  ShowDrugInstruction = async (req: Request, res: Response) => {
    try {
      const diagnosisId = req.params.id;
      const diagnosisResult = await pgClient.query('select * from drug_instruction join medicine on drug_instruction.medicine_id = medicine.id join diagnosis on drug_instruction.diagnosis_id = diagnosis.id WHERE diagnosis.id = $1;', [diagnosisId]);
      const drugInstructions = diagnosisResult.rows;
      console.log("Drug Instructions:", drugInstructions);
      res.json(drugInstructions);
    } catch (e) {
      res.status(500).json({ error: "Error Getting drug Instruction History" });
      console.error("Error Getting drug Instruction History:", e);
    }
  };


  UpdatedNotificationInfo = async (req: Request, res: Response) => {
    try {
      const diagnosisPatientId = req.params.id;
      const currentDate = new Date();
      const UpdatedNewNotification = await pgClient.query('UPDATE notification SET send_at = $1, taken = $2, taken_at = $3 WHERE patient_id = $4', [currentDate, "true", currentDate, diagnosisPatientId]);
      console.log("New notification", UpdatedNewNotification);
      const TotalQuantity = (await pgClient.query('Select id,diagnosis_id,total_quantity,taken_count_today,taken_count,period_day,period_hr,frequency_per_day,dosage_per_serving from drug_instruction WHERE diagnosis_id = $1;', [diagnosisPatientId])).rows


      for (let i = 0; i < TotalQuantity.length; i++) {
        const DrugInstructionId = TotalQuantity[i].id;
        const total_quantity = TotalQuantity[i].total_quantity;
        const taken_count = TotalQuantity[i].taken_count;
        let NewTotal_quantity = total_quantity - taken_count;
        let UpdatedNewTotalQuantities = await pgClient.query('UPDATE drug_instruction SET total_quantity = $1 WHERE id = $2', [NewTotal_quantity, DrugInstructionId]);
        console.log("New notification", UpdatedNewNotification);
        console.log("succeed bro!!!!!", UpdatedNewTotalQuantities)
      }

      res.json(TotalQuantity);
    } catch (e) {
      res.status(500).json({ error: "Error Getting drug Instruction History" });
      console.error("Error Getting drug Instruction History:", e);
    }
  };


  NewNotificationInfo = async (req: Request, res: Response) => {
    // const diagnosisId = req.params.id;
    // let SelectedData = [];

    // try {
    //   const selectQuery = 'SELECT * FROM drug_instruction JOIN medicine ON drug_instruction.medicine_id = medicine.id JOIN diagnosis ON drug_instruction.diagnosis_id = diagnosis.id JOIN notification on drug_instruction.id = notification.drug_instruction_id WHERE diagnosis.id = $1';
    //   const selectResult = await pgClient.query(selectQuery, [diagnosisId]);
    //   let SelectedData = selectResult.rows;
    //   console.log("Selected data:", SelectedData);

    //   for (let i = 0; i < SelectedData.length; i++) {
    //     const selectedRow = SelectedData[i];
    //     const { medicine_id, diagnosis_id } = selectedRow;

    //     const newData = {
    //       medicine_id: medicine_id,
    //       diagnosis_id: diagnosis_id,
    //       send_at: null,
    //       taken: null,
    //       taken_at: null,
    //     };

    //     // Add code to retrieve notification data
    //     const NotificationInfo = (await pgClient.query('SELECT send_at, taken, taken_at FROM notification WHERE patient_id = $1', [diagnosisId])).rows;

    //     // Add notification data to the new row
    //     newData.send_at = NotificationInfo[0].send_at;
    //     newData.taken = NotificationInfo[0].taken;
    //     newData.taken_at = NotificationInfo[0].taken_at;

    //     const insertQuery = 'INSERT INTO drug_instruction (medicine_id, diagnosis_id, send_at, taken, taken_at) VALUES ($1, $2, $3, $4, $5)';
    //     await pgClient.query(insertQuery, [newData.medicine_id, newData.diagnosis_id, newData.send_at, newData.taken, newData.taken_at]);
    //     console.log("New data inserted:", newData);
    //   }

    //   console.log("Data insertion complete");
    // } catch (error) {
    //   console.error("Error retrieving or inserting data:", error);
    // }
    const diagnosisId = req.params.id;
    let SelectedData = [];

    try {
      const selectQuery = 'SELECT * FROM drug_instruction JOIN medicine ON drug_instruction.medicine_id = medicine.id JOIN diagnosis ON drug_instruction.diagnosis_id = diagnosis.id JOIN notification on drug_instruction.id = notification.drug_instruction_id WHERE diagnosis.id = $1';
      const selectResult = await pgClient.query(selectQuery, [diagnosisId]);
      let SelectedData = selectResult.rows;
      console.log("Selected data:", SelectedData);
      // const NotificationInfo = (await pgClient.query('Select send_at,taken,taken_at from notification Where patient_id = $1', [diagnosisPatientId])).rows
      // console.log("what's that in notification???",NotificationInfo[0].send_at)
      // console.log("what's that in notification???",NotificationInfo[0].taken)
      // console.log("what's that in notification???",NotificationInfo[0].taken_at)
      // const send_at = NotificationInfo[i].send_at
      // const taken = NotificationInfo[i].taken
      // const taken_at = NotificationInfo[i].taken_at

      for (let i = 0; i < SelectedData.length; i++) {
        const selectedRow = SelectedData[i];
        const { medicine_id, diagnosis_id } = selectedRow;

        const newData = {
          medicine_id: medicine_id,
          diagnosis_id: diagnosis_id,
        };

        const insertQuery = 'INSERT INTO drug_instruction (medicine_id, diagnosis_id) VALUES ($1, $2)';
        await pgClient.query(insertQuery, [newData.medicine_id, newData.diagnosis_id]);
        console.log("New data inserted:", newData);
      }

      console.log("Data insertion complete");
    } catch (error) {
      console.error("Error retrieving or inserting data:", error);
    }
  }

}

