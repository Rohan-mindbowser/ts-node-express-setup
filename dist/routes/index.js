"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth/auth");
const userRoutes_1 = require("./user routes/userRoutes");
exports.routes = express_1.default.Router();
//All user routes
exports.routes.use(userRoutes_1.userRoute);
//All auth routes
exports.routes.use(auth_1.authRoute);
