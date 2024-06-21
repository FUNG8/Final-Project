import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('patient', (table) => {
        table.dropColumn('name');
        table.string('firstName', 20).nullable()
        table.string('lastName', 20).nullable()
        table.enu('gender', ['male', 'female']).nullable()
        table.enu('blood', ['A', 'B', 'AB', 'O']).nullable()
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('patient', (table) => {
        table.dropColumn('firstName');
        table.dropColumn('lastName');
        table.enu('blood', ['A', 'B', 'AB', 'O']).nullable()
        table.enu('gender', ['male', 'female']).nullable()
        table.bigInteger('name').nullable()
      });
}

