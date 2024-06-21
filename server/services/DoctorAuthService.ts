import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";

export class DoctorAuthService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("doctor");
  }

  async register(usernameInput: string, passwordInput: string) {
    try {
      let passwordHash = await hashPassword(passwordInput);

      let insertResult = await this.table().insert({
        username: usernameInput,
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

  async login(usernameInput: string, passwordInput: string) {
    try {
      let queryResult = await this.table()
        .select("*")
        .where("username", usernameInput);

      if (queryResult.length > 0) {
        let passwordHash = queryResult[0].password;

        let compare = await comparePassword(passwordInput, passwordHash);

        if (compare)
          return {
            verified: compare,
            userId: queryResult[0].id,
            username: usernameInput,
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
