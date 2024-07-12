import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable('drug_shape', (table) => {
    table.increments('id')
    table.string('shape', 255).notNullable();
  });

  await knex.schema.createTable('doctor', (table) => {
    table.increments('id')
    table.string('name', 255).notNullable();
    table.string('specialty', 255).notNullable();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
  });

  await knex.schema.createTable('medicine', (table) => {
    table.increments('id')
    table.string('name', 255).notNullable();
    table.string('generic_drug', 255).notNullable();
    table.text('description').notNullable();
    table.integer('dosage').notNullable();
    table.string('unit_measurement').notNullable();
    table.string('type', 255).notNullable();
    table.bigInteger('drug_shape_id').notNullable();
    table.string('color', 255).notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
    table.foreign('drug_shape_id').references('id').inTable('drug_shape');

  });

  await knex.schema.createTable('patient', (table) => {
    table.increments('id')
    // table.bigInteger('register_id').notNullable().unique();
    table.string('firstName', 20);
    table.string('lastName', 20);
    table.string('password', 255).notNullable();
    table.enu('gender', ['male', 'female'])
    table.enu('blood', ['A', 'B', 'AB', 'O'])
    table.string('hkid', 20).notNullable().unique();
    table.timestamp('birth_date');
    table.string('phone_number', 255);
    table.string('emergency_name', 255);
    table.string('emergency_contact', 255);
    table.timestamp('updated_at');
    table.timestamp('created_at');

  });

  await knex.schema.createTable('diagnosis', (table) => {
    table.increments('id')
    table.string('name', 255).notNullable();
    table.bigInteger('doctor_id').notNullable();
    table.bigInteger('patient_id').notNullable();
    table.text('remarks').notNullable();
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
    table.foreign('doctor_id').references('id').inTable('doctor');
    table.foreign('patient_id').references('id').inTable('patient');
  });

  await knex.schema.createTable('drug_instruction', (table) => {
    table.increments('id')
    table.bigInteger('medicine_id')
    table.bigInteger('diagnosis_id')
    table.bigInteger('total_quantity')
    table.string('method', 255)
    table.bigInteger('taken_count_today')
    table.bigInteger('taken_count')
    table.bigInteger('period_day')
    table.bigInteger('period_hr')
    table.bigInteger('frequency_per_day')
    table.bigInteger('dosage_per_serving')
    table.text('remarks')
    table.foreign('diagnosis_id').references('id').inTable('diagnosis');
    table.foreign('medicine_id').references('id').inTable('medicine');
  });


  await knex.schema.createTable('notification', (table) => {
    table.increments('id')
    table.integer('patient_id').notNullable();
    table.dateTime('send_at').notNullable();
    table.boolean('taken').notNullable().defaultTo(false);
    table.dateTime('taken_at');
    table.integer('drug_instruction_id').notNullable();
    table.timestamps(true, true);
    table.foreign('patient_id').references('id').inTable('patient');
    table.foreign('drug_instruction_id').references('id').inTable('drug_instruction');
  });



};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notification');
  await knex.schema.dropTableIfExists('drug_instruction');
  await knex.schema.dropTableIfExists('medicine');
  await knex.schema.dropTableIfExists('drug_shape');
  await knex.schema.dropTableIfExists('diagnosis');
  await knex.schema.dropTableIfExists('patient');
  await knex.schema.dropTableIfExists('doctor');



}