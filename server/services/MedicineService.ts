import { Knex } from "knex";
import { pgClient } from "../pgCLients";

export class MedicineService {
    constructor(private knex: Knex) {


    }
  
    table() {
      return this.knex("medicine");
    }
  

    async getAllMedcines_number(): Promise<any> {
      const result = await this.knex.raw(`SELECT COUNT(*) FROM medicine;`);
      return parseInt(result.rows[0].count);
    }



  }