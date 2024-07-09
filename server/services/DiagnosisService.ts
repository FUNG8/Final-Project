import { Knex } from "knex";

export class DiagnosisService {
    constructor(private knex: Knex) { }

    async getDiagnosiss(patient_id: string) {
        return this.knex("diagnosis")
            .select("*")
            .where({ patient_id })
    }

    // async getDiagnosis(patient_id: string) {
    //     const result = await this.knex.raw(`
    //         SELECT
    //             jsonb_agg(json_build_object(
    //                 'id', d.id,
    //                 'created_at', d.created_at,
    //                 'remarks', d.remarks,
    //                 'name', d.name,
    //                 'instructions', (
    //                     SELECT jsonb_agg(json_build_object(
    //                         'medicine_name', m."name",
    //                         'medicine_id', di.medicine_id,
    //                         'unit_measurement', di.unit_measurement,
    //                         'total_quantity', di.total_quantity,
    //                         'method', di."method",
    //                         'taken_count_today', di.taken_count_today,
    //                         'taken_count', di.taken_count,
    //                         'period_day', di.period_day,
    //                         'period_hr', di.period_hr,
    //                         'frequency_per_day', di.frequency_per_day,
    //                         'dosage_per_serving', di.dosage_per_serving,
    //                         'drug_remarks', di.remarks
    //                     ))
    //                     FROM drug_instruction di
    //                     JOIN medicine m ON di.medicine_id = m.id
    //                     WHERE di.diagnosis_id = d.id
    //                 )
    //             )) AS diagnosisdetail
    //         FROM diagnosis d
    //         WHERE d.patient_id = ${ patient_id }
    //         GROUP BY d.patient_id;
    //     `);
    //     return result.rows
    // }

    async getDiagnosis(patient_id: string) {
        const result = await this.knex.raw(`
            SELECT
                jsonb_agg(json_build_object(
                    'id', d.id,
                    'created_at', d.created_at,
                    'remarks', d.remarks,
                    'name', d.name,
                    'instructions', (
                        SELECT jsonb_agg(json_build_object(
                            'instructon_id', d.id,
                            'medicine_name', m."name",
                            'medicine_id', di.medicine_id,
                            'unit_measurement', di.unit_measurement,
                            'total_quantity', di.total_quantity,
                            'method', di."method",
                            'taken_count_today', di.taken_count_today,
                            'taken_count', di.taken_count,
                            'period_day', di.period_day,
                            'period_hr', di.period_hr,
                            'frequency_per_day', di.frequency_per_day,
                            'dosage_per_serving', di.dosage_per_serving,
                            'drug_remarks', di.remarks
                        ))
                        FROM drug_instruction di
                        JOIN medicine m ON di.medicine_id = m.id
                        WHERE di.diagnosis_id = d.id
                    )
                )) AS diagnosisdetail
            FROM diagnosis d
            WHERE d.patient_id = ${patient_id}
            GROUP BY d.patient_id;
        `);
        return result.rows[0].diagnosisdetail
    }
}

