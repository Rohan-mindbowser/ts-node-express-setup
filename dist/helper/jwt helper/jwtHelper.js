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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyAccessToken = exports.generateAccessToken = void 0;
const JWT = require("jsonwebtoken");
const http_errors_1 = __importDefault(require("http-errors"));
const generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = {
            _id: user._id,
            email: user.email,
        };
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "15m",
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
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers["authorization"])
            throw http_errors_1.default.Unauthorized();
        const authToken = req.headers["authorization"];
        const bearerToken = authToken.split(" ");
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(http_errors_1.default.Unauthorized());
            }
            next();
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAccessToken = verifyAccessToken;
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = {
            _id: user._id,
            email: user.email,
        };
        const privateKey = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1y",
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
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err)
                return reject(http_errors_1.default.BadRequest());
            const userId = payload.aud;
            resolve(userId);
        });
    });
});
exports.verifyRefreshToken = verifyRefreshToken;
