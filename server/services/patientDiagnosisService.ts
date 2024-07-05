import { Knex } from "knex";


export class PatientDiagnosisService {
    constructor(private knex: Knex) { }


    async DiagnosisDetails(hkid: string) {
        return this.knex("patient")
            .join('diagnosis', 'patient.id', '=', 'diagnosis.patient_id')
            .select(
                'patient.firstName',
                'diagnosis.name',
                'diagnosis.created_at')
            .where("patient.hkid", hkid)
            .first()
    }

}
