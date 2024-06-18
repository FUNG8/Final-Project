import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('admin', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('password');
      });
      await knex.schema.createTable('patient', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('password');
        table.string('id_number');
        table.timestamp('birth_date');
        table.string('phone_number');
        table.integer('diagnosis_id');
        table.string('emergency_name');
        table.string('emergency_contact');
        table.timestamp('updated_at');
        table.timestamp('created_at');
      });
      await knex.schema.createTable('medicine', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('generic_drug');
        table.text('description');
        table.integer('dosage');
        table.string('type');
        table.string('shape');
        table.string('color');
        table.timestamp('created_at');
        table.timestamp('updated_at');
      });
      await knex.schema.createTable('diagnosis', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.integer('doctor_id');
        table.text('remarks');
        table.timestamp('updated_at');
        table.timestamp('created_at');
      });
      await knex.schema.createTable('doctor', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('specialty');
      });
      await knex.schema.createTable('drug_instruction', (table) => {
        table.increments('id').primary();
        table.integer('medicine_id');
        table.integer('diagnosis_id');
        table.integer('total_quantity');
        table.string('method');
        table.integer('taken_count_today');
        table.integer('taken_count');
        table.integer('period_day');
        table.integer('period_hr');
        table.integer('frequency_per_day');
        table.integer('dosage_per_serving');
        table.text('remarks');
        table.integer('notification_id');
      });
      await knex.schema.createTable('notification', (table) => {
        table.increments('id').primary();
        table.integer('patient_id');
        table.integer('medicine_id');
        table.timestamp('send_at');
        table.boolean('taken');
        table.timestamp('taken_at');
      });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('admin');
    await knex.schema.dropTable('patient');
    await knex.schema.dropTable('medicine');
    await knex.schema.dropTable('diagnosis');
    await knex.schema.dropTable('doctor');
    await knex.schema.dropTable('drug_instruction');
    await knex.schema.dropTable('notification');
}