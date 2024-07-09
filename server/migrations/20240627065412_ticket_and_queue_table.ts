import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tickets', function (table) {
      table.increments('id').primary();
      table.integer('patient_id').notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
      table.integer('ticket_number');
      table.string('status', 10).defaultTo('waiting');
    });
  
    await knex.schema.createTable('queue', function (table) {
      table.increments('id').primary();
      table.integer('ticket_id').notNullable();
      table.integer('queue_position');
      table.foreign('ticket_id').references('id').inTable('tickets');
    });
  
    // Insert data into the tables
    await knex('tickets').insert([
      { patient_id: 1, ticket_number: 1, status: 'waiting' },
      { patient_id: 2, ticket_number: 2, status: 'waiting' },
      { patient_id: 3, ticket_number: 3, status: 'waiting' },
    ]);
  
    await knex('queue').insert([
      { ticket_id: 1, queue_position: 1 },
      { ticket_id: 2, queue_position: 2 },
      { ticket_id: 3, queue_position: 3 },
    ]);
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('queue');
    await knex.schema.dropTableIfExists('tickets');
  }
