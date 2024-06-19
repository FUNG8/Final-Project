import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('medicine', (table) => {
    table.bigInteger('id').primary();
    table.string('name', 255).notNullable();
    table.string('generic_drug', 255).notNullable();
    table.text('description').notNullable();
    table.integer('dosage').notNullable();
    table.bigInteger('unit_measurement').notNullable();
    table.string('type', 255).notNullable();
    table.bigInteger('drug_shape_id').notNullable();
    table.string('color', 255).notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  });

  await knex.schema.createTable('diagnosis', (table) => {
    table.bigInteger('id').primary();
    table.string('name', 255).notNullable();
    table.bigInteger('doctor_id').notNullable();
    table.text('remarks').notNullable();
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
  });

  await knex.schema.createTable('drug_instruction', (table) => {
    table.bigInteger('id').primary();
    table.bigInteger('medicine_id').notNullable();
    table.bigInteger('diagnosis_id').notNullable();
    table.bigInteger('unit_measurement').notNullable();
    table.bigInteger('total_quantity').notNullable();
    table.string('method', 255).notNullable();
    table.bigInteger('taken_count_today').notNullable();
    table.bigInteger('taken_count').notNullable();
    table.bigInteger('period_day').notNullable();
    table.bigInteger('period_hr').notNullable();
    table.bigInteger('frequency_per_day').notNullable();
    table.bigInteger('dosage_per_serving').notNullable();
    table.text('remarks').notNullable();
  });

  await knex.schema.createTable('patient', (table) => {
    table.bigInteger('id').primary();
    table.bigInteger('register_id').notNullable();
    table.string('name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.bigInteger('hkid_number').nullable().unique();
    table.timestamp('birth_date').notNullable();
    table.string('phone_number', 255).notNullable();
    table.bigInteger('diagnosis_id').notNullable();
    table.string('emergency_name', 255).notNullable();
    table.string('emergency_contact', 255).notNullable();
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
  });

  await knex.schema.createTable('notification', (table) => {
    table.bigInteger('id').primary();
    table.bigInteger('patient_id').notNullable();
    table.timestamp('send_at').notNullable();
    table.boolean('taken').notNullable();
    table.timestamp('taken_at').notNullable();
    table.bigInteger('drug_instruction_id').notNullable();
  });

  await knex.schema.createTable('drug_shape', (table) => {
    table.bigInteger('id').primary();
    table.string('shape', 255).notNullable();
  });

  await knex.schema.createTable('doctor', (table) => {
    table.bigInteger('id').primary();
    table.string('name', 255).notNullable();
    table.string('specialty', 255).notNullable();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
  });

  await knex.schema.alterTable('notification', (table) => {
    table.foreign('patient_id').references('id').inTable('patient');
  });

  await knex.schema.alterTable('drug_instruction', (table) => {
    table.foreign('diagnosis_id').references('id').inTable('diagnosis');
    table.foreign('medicine_id').references('id').inTable('medicine');
  });

  await knex.schema.alterTable('patient', (table) => {
    table.foreign('diagnosis_id').references('id').inTable('diagnosis');
  });

  await knex.schema.alterTable('diagnosis', (table) => {
    table.foreign('doctor_id').references('id').inTable('doctor');
  });

  await knex.schema.alterTable('medicine', (table) => {
    table.foreign('drug_shape_id').references('id').inTable('drug_shape');
  });

  await knex.schema.alterTable('notification', (table) => {
    table.foreign('drug_instruction_id').references('id').inTable('drug_instruction');
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notification');
  await knex.schema.dropTableIfExists('drug_instruction');
  await knex.schema.dropTableIfExists('patient');
  await knex.schema.dropTableIfExists('diagnosis');
  await knex.schema.dropTableIfExists('medicine');
  await knex.schema.dropTableIfExists('drug_shape');
  await knex.schema.dropTableIfExists('doctor');
}