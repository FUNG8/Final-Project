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
    console.log( {
      name,
      generic_drug,
      description,
      dosage,
      unit_measurement,
      type,
      drug_shape_id,
      color,
      created_at,
      updated_at,
    })
    const trx = await this.knex.transaction()

    try {
        // Insert the medicine first
        console.log("Med Service Inserting")
        let medInsertResult = await trx
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
          .into("medicine")
          .returning("id");
  
        if (medInsertResult.length > 0) {
          // Check if the drug_shape_id already exists in the drug_shape table
          let drugShapeExistsResult = await trx
            .from("drug_shape")
            .where("id", drug_shape_id)
            .first();
  
          if (!drugShapeExistsResult) {
            // Insert the drug shape if it doesn't exist
            await trx
              .insert({
                id: drug_shape_id,
                // Add any other drug shape properties here
              })
              .into("drug_shape");
          }
  
          await trx.commit()
          return medInsertResult[0].id;
        } else {
          throw new Error("Failed to insert Medicine");
        }
    } catch (error) {
      console.log("Error insert Medicine", error);
      trx.rollback()
      throw error;
    }
  }
}
