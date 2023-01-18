import { Knex } from "knex";
const knexFile = require("../knexfile");

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("employes", function (table) {
      table.increments("eid");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.integer("mid").notNullable();
      table.timestamps(true, true);
    })
    .createTable("managers", function (table) {
      table.increments("mid");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("managers").dropTable("employes");
}
