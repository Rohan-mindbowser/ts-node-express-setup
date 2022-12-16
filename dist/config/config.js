"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` }); // change according to your need
const MONGO_URL = String(process.env.DB_URI);
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
