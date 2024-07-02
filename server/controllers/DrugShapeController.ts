import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { DrugService } from "../services/DrugService";

export class DrugShapeController {
  router: Router;
  constructor(private drugService: DrugService) {
    this.router = Router();
    this.router.get("/getDrugShape", this.getDrugsShape);
  }

  getDrugsShape = async (req: Request, res: Response) => {
    try {
      const drugShapeResult = await this.drugService.getDrugsShape();
      res.json(drugShapeResult);
    } catch (e) {
      console.log("Error Getting Drug Shape", e);
      res.status(500).json({ error: "Error Getting Drug Shape" });
    }
  };
}