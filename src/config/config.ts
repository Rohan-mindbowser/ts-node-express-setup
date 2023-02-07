import dotenv from "dotenv";

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` }); // change according to your need

const MONGO_URL = String(process.env.DB_URI);

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  postgres: {
    db: process.env.PG_DB_NAME,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
  },
  server: {
    port: SERVER_PORT,
  },
  nodemailer: {
    NODE_MAILER_HOST: process.env.NODE_MAILER_HOST,
    NODE_MAILER_PORT: process.env.NODE_MAILER_PORT,
    NODE_MAILER_USER: process.env.NODE_MAILER_USER,
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
    NODE_MAILER_FROM: process.env.NODE_MAILER_FROM,
  },
};
