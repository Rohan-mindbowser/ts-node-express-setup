"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = `mongodb://localhost:27017/user`;
const SERVER_PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
