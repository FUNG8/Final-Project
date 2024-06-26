import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";

export class PatientAuthService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("patient");
  }

  async register(registeridInput: string, passwordInput: string) {
    try {
      let passwordHash = await hashPassword(passwordInput);

      let insertResult = await this.table().insert({
        registerid: registeridInput,
        password: passwordHash,
      });

      if (insertResult != undefined) {
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
      return false;
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
