import { Knex } from "knex";


export class PatientProfileService {
    constructor(private knex: Knex) { }

    
    async PatientDetails(hkid:string){
        return this.knex("patient")
                    .select(
                    'firstName',
                    'lastName',
                    'birth_date',
                    'gender',
                    'phone_number',
                    'emergency_contact')
                    .where({hkid})
                    .first()

         
    }

}

