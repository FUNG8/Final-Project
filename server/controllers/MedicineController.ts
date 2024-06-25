// controller
import { Router, Request, Response } from "express";
import { MedicineService } from "../services/MedicineService";

export const medicineRouter = Router();

export class MedicineController {
  router: any;
  constructor(private medicineService: MedicineService) {
    this.router = Router();
    this.router.get("/allMedicines", this.allMedicines);
    medicineRouter.use("/", this.router);
  }

  allMedicines = async (req: Request, res: Response) => {
    try {
      let medicineResult = await this.medicineService.getMedcines();
      res.json(medicineResult);
    } catch (e) {
      res.status(500).json({ error: "Error Getting Medicine Information" });
      console.log("Error Getting Medicine Seed", e);
    }
  };
}