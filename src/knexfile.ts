// Update with your config settings.
import { config } from "dotenv";
import { config as appConfig } from "./config/config";
config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: appConfig.postgres.db,
      user: appConfig.postgres.user,
      password: appConfig.postgres.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
