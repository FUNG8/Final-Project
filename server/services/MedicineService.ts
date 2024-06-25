import { Knex } from "knex";
import { pgClient } from "../pgCLients";

export class MedicineService {
    constructor(private knex: Knex) {}
  
    table() {
      return this.knex("medicine");
    }
  
    async getMedcines(): Promise<any[]> {
      const result = await this.knex.raw("SELECT * FROM medicine");
      return result.rows;
    }
  }