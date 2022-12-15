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
exports.refreshTokenController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jwtHelper_1 = require("../helper/jwt helper/jwtHelper");
const refreshTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            throw http_errors_1.default.BadRequest();
        const userId = yield (0, jwtHelper_1.verifyRefreshToken)(refreshToken);
        const newAccessToken = yield (0, jwtHelper_1.generateAccessToken)({ _id: userId });
        const newRefreshToken = yield (0, jwtHelper_1.generateRefreshToken)({ _id: userId });
        res.send({ newAccessToken, newRefreshToken });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshTokenController = refreshTokenController;
