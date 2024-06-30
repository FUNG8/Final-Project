import { Knex } from "knex";
import { pgClient } from "../pgCLients";

export class MedicineService {
  constructor(private knex: Knex) {}

  table() {
    return this.knex("medicine");
  }

  async getAllMedcines_number(): Promise<any> {
    const result = await this.knex.raw(`SELECT COUNT(*) FROM medicine;`);
    return parseInt(result.rows[0].count);
  }

  async insertMedicine(
    name: string,
    generic_drug: string,
    description: string,
    dosage: string,
    unit_measurement: string,
    type: string,
    drug_shape_id: string,
    color: string,
    created_at: string,
    updated_at: string
  ) {
    try{
    let medInsertResult = await this.table()
    .insert({
      name: name,
      generic_drug: generic_drug,
      description: description,
      dosage: dosage,
      unit_measurement: unit_measurement,
      type: type,
      drug_shape_id: drug_shape_id,
      color: color,
      created_at: created_at,
      updated_at: updated_at,
    })
    .returning('id');

  if (medInsertResult.length>0){
    return medInsertResult[0].id;
  }else{
    throw new Error('Failed to insert Medicine')
  }}catch(error){
    console.log('Error insert Medicine', error)
    throw error;
  }
  }
}
