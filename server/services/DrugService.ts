import { Knex } from "knex";

export class DrugService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("drug_shape");
  }

  async getDrugsShape(): Promise<any[]> {
    const result = await this.table().select("*");
    return result;
  }
}