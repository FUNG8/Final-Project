// controller
import { Router, Request, Response } from "express";
import { MedicineService } from "../services/MedicineService";
import { pgClient } from "../pgCLients";

export const medicineRouter = Router();

export class MedicineController {
  router: any;
  constructor(private medicineService: MedicineService) {
    this.router = Router();
    this.router.get("/allMedicines", this.allMedicines);
    this.router.post("/insertMedicines", this.insertMedicines);
    medicineRouter.use("/", this.router);
  }

  allMedicines = async (req: Request, res: Response) => {
    try {
      let queryString = `select medicine.id as medicine_id ,* from medicine join drug_shape on medicine.drug_shape_id = drug_shape.id order by medicine.id`;
      console.log("check req query", req.query);
      let pageNumber: number = parseInt(req.query.pageNumber as string);
      const perPage = 20;
      let totalMedicine = await this.medicineService.getAllMedcines_number();
      let totalPages = Math.ceil(totalMedicine / perPage);

      const currentPage = pageNumber; // Replace with the actual current page value
      const startIndex = (currentPage - 1) * perPage;

      const searchTerm: any = req.query.searchTerm;
      // let medicineResult = await this.medicineService.getMedcines();

      console.log("123", searchTerm);
      if (searchTerm) {
        if (isNaN(searchTerm)) {
          console.log("query is string");
          queryString += ` WHERE SIMILARITY("name",'${searchTerm}') > 0.1`;
          totalMedicine = (
            await pgClient.query(
              `SELECT COUNT(*) FROM medicine WHERE SIMILARITY("name",'${searchTerm}') > 0.1`
            )
          ).rows[0].count;
          console.log(totalMedicine);
          totalPages = Math.ceil(totalMedicine / perPage);
          console.log("upper", totalPages);
        } else {
          console.log("query is number");

          queryString += ` WHERE generic_drug = ${searchTerm}  `;
          totalMedicine = (
            await pgClient.query(
              `SELECT COUNT(*) FROM medicine WHERE SIMILARITY("generic_drug",'${searchTerm}') > 0.1`
            )
          ).rows[0].count;
          console.log("lower", totalMedicine);
          totalPages = Math.ceil(totalMedicine / perPage);
          console.log(totalPages);
        }
      }

      queryString += ` OFFSET $1 LIMIT $2`;

      console.log("check query string", queryString);
      let medicineResult = (
        await pgClient.query(queryString, [startIndex, perPage])
      ).rows;

      console.log("check medi ggg", medicineResult);

      const response = {
        medicineResult,
        totalPages: totalPages,
        currentPage: currentPage,
      };

      res.json(response);
    } catch (e) {
      res.status(500).json({ error: "Error Getting Medicine Information" });
      console.log("Error Getting Medicine Seed", e);
    }
  };

  insertMedicines = async (req: Request, res: Response) => {
    let {
      name,
      generic_drug,
      description,
      dosage,
      unit_measurement,
      type,
      drug_shape_id,
      color,
      created_at,
      updated_at,
    } = req.body;
    try {
      let insertMedsResult = await this.medicineService.insertMedicine(
        name,
        generic_drug,
        description,
        dosage,
        unit_measurement,
        type,
        drug_shape_id,
        color,
        created_at,
        updated_at
      );
      if (insertMedsResult) {
        res.json({ message: "insert medicine success" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}