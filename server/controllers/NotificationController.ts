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
      const diagnosisResult = await pgClient.query(
        'select * from notification join drug_instruction on drug_instruction_id = drug_instruction.id join diagnosis on drug_instruction.diagnosis_id = diagnosis.id join medicine on drug_instruction.medicine_id = medicine.id where diagnosis.id = $1;',
        [diagnosisId]
      );
      const drugInstructions = diagnosisResult.rows.filter(instruction => instruction.taken === false)
      console.log("Drug Notification information:", drugInstructions);
      res.json(drugInstructions);
    } catch (e) {
      res.status(500).json({ error: "Error Getting drug Instruction History" });
      console.error("Error Getting drug Instruction History:", e);
    }
  };


  UpdatedNotificationInfo = async (req: Request, res: Response) => {
    try {
      const diagnosisId = req.params.id;
      const periodHour = req.body.period_hr
      const takenCountToday = req.body.taken_count_today + 1
      const takenCount = req.body.taken_count + 1
      const FrquencyPerDay = req.body.frequency_per_day
      const TakenCountToday = req.body.taken_count_today
      const lastTakenTimeSQL = (await pgClient.query('select * from notification join drug_instruction on notification.drug_instruction_id = drug_instruction.id where diagnosis_id = $1;',[diagnosisId])).rows
      console.log("whatis thissssss",lastTakenTimeSQL)
      // const lastTakenTime = new Date(lastTakenTimeSQL)
      // Start a setInterval based on the periodHour
      const intervalId = setInterval(async () => {
        if (takenCountToday === FrquencyPerDay) {
          await pgClient.query(
            'UPDATE drug_instruction SET taken_count_today = $1, taken_count = $2, WHERE diagnosis_id = $3',
            [0, takenCount, diagnosisId]
          );
          // Stop the interval
          clearInterval(intervalId);
        } else {
          const updatedTakenNotification = await pgClient.query(
            'UPDATE drug_instruction SET taken_count_today = $1, taken_count = $2 WHERE diagnosis_id = $3',
            [TakenCountToday, takenCount, diagnosisId]
          );
          console.log("New notification", updatedTakenNotification);
        }
      },  5 * 1000); // Convert periodHour to millisecondsƒ

      const TotalQuantity = (await pgClient.query('Select id,diagnosis_id,total_quantity,taken_count_today,taken_count,period_day,period_hr,frequency_per_day,dosage_per_serving from drug_instruction WHERE diagnosis_id = $1;', [diagnosisId])).rows


      for (let i = 0; i < TotalQuantity.length; i++) {
        const DrugInstructionId = TotalQuantity[i].id;
        const total_quantity = TotalQuantity[i].total_quantity;
        const dosagePerServing = TotalQuantity[i].dosage_per_serving;
        let NewTotal_quantity = total_quantity - dosagePerServing;
        let UpdatedNewTotalQuantities = await pgClient.query('UPDATE drug_instruction SET total_quantity = $1 WHERE id = $2', [NewTotal_quantity, DrugInstructionId]);
        console.log("succeed bro!!!!!", UpdatedNewTotalQuantities)
      }

      res.json(TotalQuantity);
    } catch (e) {
      res.status(500).json({ error: "Error Getting drug Instruction History" });
      console.error("Error Getting drug Instruction History:", e);
    }
  };


  NewNotificationInfo = async (req: Request, res: Response) => {
    console.log("into new notication controller:")
    const diagnosisId = req.params.id;
    try {
      const selectResult = await pgClient.query('SELECT * FROM drug_instruction JOIN medicine ON drug_instruction.medicine_id = medicine.id JOIN diagnosis ON drug_instruction.diagnosis_id = diagnosis.id WHERE diagnosis.id = $1', [diagnosisId]);
      let SelectedData = selectResult.rows;
      console.log("Selected data:", SelectedData);

      for (let i = 0; i < SelectedData.length; i++) {
        const selectedRow = SelectedData[i];
        const { id, patient_id } = selectedRow;

        const newData = {
          patient_id: patient_id,
          drug_instruction_id: id,
          send_at: new Date(),
          created_at: new Date()
        };

        const insertQuery = 'INSERT INTO notification (patient_id, drug_instruction_id, send_at, created_at) VALUES ($1, $2, $3, $4)';
        await pgClient.query(insertQuery, [newData.patient_id, newData.drug_instruction_id, newData.send_at, newData.created_at]);
        // console.log("New data inserted!!!!!!!!:", newData);
      }

      console.log("Data insertion complete");
    } catch (error) {
      console.error("Error retrieving or inserting data:", error);
    }
  }

}

