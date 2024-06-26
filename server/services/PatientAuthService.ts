import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";

export class PatientAuthService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("patient");
  }

  async createPatients(
    
    register_id: string,
    hkid: string,
    // firstName: string,
    // lastName: string,
    // gender: string,
    // blood: string,
    password: string,
    // birth_date: string,
    // phone_number: string,
    // diagnosis_id: number,
    // emergency_name: string,
    // emergency_contact: string,
   
  ): Promise<any> 
    // Method implementation
   {
    try {
      let passwordHash = await hashPassword(password);
  
      let insertResult = await this.table()
      .insert({
        hkid: hkid,
        register_id: register_id,
        password: passwordHash,
        

      });
  
      if (insertResult !== undefined && insertResult.length > 0) {
        return insertResult[0];
      } else {
        throw new Error('Failed to create patient');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async login(registeridInput: string, passwordInput: string) {
    try {
      let queryResult = await this.table()
        .select("*")
        .where("register_id", registeridInput);

      if (queryResult.length > 0) {
        let passwordHash = queryResult[0].password;

        let compare = await comparePassword(passwordInput, passwordHash);

        if (compare)
          return {
            verified: compare,
            userId: queryResult[0].id,
            registerId: registeridInput,
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
