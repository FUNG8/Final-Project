import { count } from "console";
import { Knex } from "knex";

export class PatientService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("patient");
  }

  async getPatients(startIndex: number, perPage: number): Promise<any[]> {
    const result = await this.knex.raw(
      `SELECT * FROM patient OFFSET ? LIMIT ?;`,
      [startIndex, perPage]
    );
    return result.rows;
  }

  // async searchPatients(
  //   queryString: string,
  //   pageNumber: number,
  //   perPage:number,
  // ): Promise<any[]> {
  //   const result = await this.knex.raw(`SELECT * FROM patient;`);
  //   return result.rows;
  // }

  async totalPatients(): Promise<any> {
    const totalPatientResult = await this.knex.raw(
      `SELECT COUNT(*) FROM patient;`
    );
    return totalPatientResult.rows[0].count;
  }

  async patientResult(
    searchTerm: any,
    startIndex: number,
    perPage: number,
    totalPatients:any,
    totalPages:any
  ): Promise<any> {
    console.log(searchTerm,startIndex,perPage)
    let queryString = `SELECT * FROM patient`;
    if (searchTerm) {
      if (isNaN(searchTerm)) {
        queryString += ` WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1 OR SIMILARITY("hkid",'${searchTerm}') > 0.60`;
        totalPatients = `SELECT COUNT(*) FROM patient WHERE SIMILARITY("firstName",'${searchTerm}') > 0.1`;
        totalPages = Math.ceil(totalPatients / perPage);
        console.log(totalPages);
      }
    }
    queryString += ` OFFSET ? LIMIT ?`;
    // console.log(queryString)
    const patientResult = await this.knex.raw(queryString, [
      startIndex,
      perPage
    ]);
    return patientResult.rows;
  }
}
