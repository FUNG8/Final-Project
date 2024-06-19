import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('patient', (table) => {
    table.dropColumn('hkid_number');
    table.string('hkid', 20).nullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('patient', (table) => {
    table.dropColumn('hkid');
    table.bigInteger('hkid_number').nullable().unique();
  });
}