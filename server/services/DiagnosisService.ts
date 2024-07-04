import {Knex} from "knex";

export class DiagnosisService{
    constructor(private knex:Knex){}

    async getDiagnosis(patient_id:string){
       return this.knex("diagnosis")
       .select("*")
       .where({patient_id})
    }
}

