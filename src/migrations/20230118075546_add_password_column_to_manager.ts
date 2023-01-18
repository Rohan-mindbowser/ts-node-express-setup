import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("managers", (table) => {
    table.string("password", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("managers", (table) => {
    table.dropColumn("password");
  });
}
