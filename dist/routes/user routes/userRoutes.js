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
exports.userRoute = void 0;
const express_1 = require("express");
const user_model_1 = require("../../models/user.model");
const http_errors_1 = __importDefault(require("http-errors"));
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post("/adduser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield user_model_1.User.findOne({ email: req.body.email });
        if (emailExist) {
            throw http_errors_1.default.Conflict(`${req.body.email} is already been registered`);
        }
        const user = yield user_model_1.User.create(req.body);
        yield user.save();
        res.status(201).send("Signup success..!!");
    }
    catch (error) {
        next(error);
    }
}));
