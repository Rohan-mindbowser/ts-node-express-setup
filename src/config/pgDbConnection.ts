import knex from "knex";
// import { knexFile } from "../knexfile";
const knexFile = require("../knexfile");

export const postgresDb = knex(knexFile.development);
