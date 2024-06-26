import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('diagnosis', (table) => {
        table.enu('status', ['noShow','waiting', 'completed']).nullable()
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('diagnosis', (table) => {
        table.enu('status', ['noShow','waiting', 'completed']).nullable()
        
      });
}

