import { Knex } from "knex";

export class DiagnosisService {
  constructor(private knex: Knex) {}

  async insertDiagnosis(
    d_name:any,
    d_doctor_id:any,
    d_patient_id:any,
    d_remarks:any,
    d_created_at:any,
    d_updated_at:any,
    demoInstructions:any
  ) {
    const diagnosisResult = await this.knex.raw(
      "INSERT INTO diagnosis (name, doctor_id, patient_id, remarks, updated_at, created_at) VALUES(?, ?, ?, ?, ?, ?) RETURNING *",
      [d_name, d_doctor_id, d_patient_id, d_remarks, d_created_at, d_updated_at]
    );
    console.log("id?", diagnosisResult.rows[0].id);

    for (const instruction of demoInstructions) {
      await this.knex.raw(
        "INSERT INTO drug_instruction (medicine_id,diagnosis_id,unit_measurement, total_quantity,method,period_day,period_hr,frequency_per_day,dosage_per_serving,remarks) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          instruction.medicineId,
          diagnosisResult.rows[0].id,
          instruction.unit,
          instruction.quantity,
          instruction.method,
          instruction.periodDay,
          instruction.periodHour,
          instruction.frequencyPerDay,
          instruction.dosagePerServing,
          instruction.remarks,
        ]
      );
    }

    return diagnosisResult
  }

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
                            'unit_measurement', m.unit_measurement,
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
    return result.rows[0].diagnosisdetail;
  }
}
