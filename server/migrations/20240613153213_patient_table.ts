import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('admin', (table) => {
        table.increments('id').primary();
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        // remove the unique constraint
        // table.unique('username', 'admin_username_unique');
    });

    await knex.schema.createTable('medicine', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255).notNullable();
        table.string('generic_drug', 255).notNullable();
        table.integer('dosage').notNullable();
        table.string('shape', 255).notNullable();
        table.string('color', 255).notNullable();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.text('remarks').notNullable();
        table.timestamp('created_at').notNullable();
        table.timestamp('updated_at').notNullable();
    });

    await knex.schema.createTable('diagnosis', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255).notNullable();
        table.bigInteger('medicine_id').notNullable();
        table.bigInteger('doctor_id').notNullable();
        table.bigInteger('patient_id').notNullable();
        table.timestamp('diagnosis_date').notNullable();
        table.text('remarks').notNullable();
        table.timestamp('updated_at').notNullable();
        table.timestamp('created_at').notNullable();
    });

    await knex.schema.createTable('care_giver', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('phone_number', 255);
        // remove the unique constraint
        // table.unique('email', 'care_giver_email_unique');
    }); 

    await knex.schema.createTable('patient', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255).notNullable();
        table.bigInteger('id_number').notNullable();
        table.string('email', 255).notNullable();
        table.string('phone_number', 255).notNullable();
        table.bigInteger('diagnosis_id').notNullable();
        table.bigInteger('care_giver_id').notNullable();
        table.timestamp('updated_at').notNullable();
        table.timestamp('created_at').notNullable();
        // remove the unique constraint
        // table.unique(['email'], 'patient_email_unique');
    });

    await knex.schema.createTable('notification', (table) => {
        table.bigInteger('id').primary();
        table.bigInteger('patient_id').notNullable();
        table.bigInteger('medicine_id').notNullable();
        table.bigInteger('care_giver_id').notNullable();
        table.timestamp('reminder_period').notNullable();
        table.timestamp('send_at').notNullable();
        table.boolean('times_taken').notNullable();
        table.timestamp('notify_care_giver').notNullable();
    });

    await knex.schema.createTable('doctor', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255).notNullable();
        table.string('specialty', 255).notNullable();
    });

    await knex.schema.alterTable('notification', (table) => {
        table.foreign('patient_id').references('patient.id');
        table.foreign('care_giver_id').references('care_giver.id');
    });

    await knex.schema.alterTable('diagnosis', (table) => {
        table.foreign('patient_id').references('patient.id');
        table.foreign('medicine_id').references('medicine.id');
        table.foreign('doctor_id').references('doctor.id');
    });

    await knex.schema.alterTable('patient', (table) => {
        table.foreign('diagnosis_id').references('diagnosis.id');
        table.foreign('care_giver_id').references('care_giver.id');
    });

    await knex.schema.alterTable('notification', (table) => {
        table.foreign('medicine_id').references('medicine.id');
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('notification');
    await knex.schema.dropTableIfExists('patient');
    await knex.schema.dropTableIfExists('care_giver');
    await knex.schema.dropTableIfExists('diagnosis');
    await knex.schema.dropTableIfExists('medicine');
    await knex.schema.dropTableIfExists('doctor');
    await knex.schema.dropTableIfExists('admin');
}