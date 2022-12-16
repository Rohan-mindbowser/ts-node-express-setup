import dotenv from "dotenv";

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` }); // change according to your need

const MONGO_URL = String(process.env.DB_URI);

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

