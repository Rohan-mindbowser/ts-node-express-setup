"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexFile = void 0;
// Update with your config settings.
const dotenv_1 = require("dotenv");
const config_1 = require("./config/config");
(0, dotenv_1.config)();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
exports.knexFile = {
    development: {
        client: "postgresql",
        connection: {
            database: config_1.config.postgres.db,
            user: config_1.config.postgres.user,
            password: config_1.config.postgres.password,
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
