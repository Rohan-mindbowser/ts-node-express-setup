import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = `mongodb://localhost:27017/user`;

const SERVER_PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
