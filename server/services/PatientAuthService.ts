import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";

export class PatientAuthService {
  constructor(private knex: Knex) { }

  table() {
    return this.knex("patient");
  }

  async createPatients(
    hkid:string,
    password:string,
    firstName:string,
    lastName:string,
    gender:string,
    blood:string,
    birth_date:string,
    phone_number:string,
    diagnosis_id:string,
    emergency_name:string,
    emergency_contact:string
  ): Promise<number | null> {
    try {
      // Check if the patient already exists
      const existingPatient = await this.table().where({ hkid }).first();
      if (existingPatient) {
        throw new Error(`Patient with HKID ${hkid} already exists.`);
      }

      let passwordHash = await hashPassword(password);

      let insertResult = await this.table()
        .insert({
          hkid: hkid,
          password: passwordHash,
          firstName: firstName,
          lastName: lastName,
          gender: gender, 
          blood: blood ,
          birth_date: birth_date,
          phone_number: phone_number,
          diagnosis_id: diagnosis_id,
          emergency_name: emergency_name,
          emergency_contact: emergency_contact
        })
        .returning('id');

      if (insertResult.length > 0) {
        return insertResult[0].id;
      } else {
        throw new Error('Failed to create patient');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async login(hkidInput: string, passwordInput: string) {
    try {
      let queryResult = await this.table()
        .select("*")
        .where("hkid", hkidInput);

      if (queryResult.length > 0) {
        let passwordHash = queryResult[0].password;

        let compare = await comparePassword(passwordInput, passwordHash);

        if (compare)
          return {
            verified: compare,
            userId: queryResult[0].id,
            hkid: hkidInput,
            firstName: queryResult[0].firstName,
            lastName: queryResult[0].lastName
          };
        else return { verified: false, reason: "wrong password" };
      } else {
        return { verified: false, reason: "wrong username" };
      }
    } catch (error) {
      console.log("internal error caught!", error);
      return { verified: false, reason: "internal server error" };
    }
  }
}
