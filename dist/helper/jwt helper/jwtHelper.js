"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const JWT = require("jsonwebtoken");
const generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = {
            _id: user._id,
            email: user.email,
        };
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1m",
            issuer: "node_backend",
            audience: String(user._id),
        };
        JWT.sign(payload, privateKey, options, (err, token) => {
            if (err)
                return reject(err);
            resolve(token);
        });
    });
});
exports.generateAccessToken = generateAccessToken;
