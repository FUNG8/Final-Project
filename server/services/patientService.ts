import { Knex } from "knex";

export class PatientService{
    constructor(private knex:Knex){}

    table() {
        return this.knex("patient");
      }

      async getPatients(startIndex: number, perPage: number): Promise<any[]> {
        const result = await this.knex.raw(`SELECT * FROM patient OFFSET ? LIMIT ?;`, [startIndex, perPage]);
        return result.rows;
      }

     
}

