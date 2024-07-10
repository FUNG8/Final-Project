import { Knex } from "knex";
import { pgClient } from "../pgCLients";

export class HomePatientService {
  constructor(private knex: Knex) {

  }

  // table() {
  //   return this.knex("tickets");
  // }

  // async PatientWaitingList(){
  //   return this.knex.raw('SELECT COUNT(status) FROM tickets WHERE status = $1;', ['waiting'])
  // } 

  // async PatientCompletedList(){
  //   return this.knex.raw('SELECT COUNT(status) FROM tickets WHERE status = $1;', ['completed'])
  // } 

  // async MaxTicketNumber(){
  //   const [{ max }] = await this.knex.raw(`SELECT MAX(ticket_number) FROM tickets`);
  //   return max
  // } 

}