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
exports.getUser = exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const http_errors_1 = __importDefault(require("http-errors"));
const validateSchema_1 = require("../helper/validate schema/validateSchema");
/** This controller adds new user */
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield user_model_1.User.findOne({ email: req.body.email });
        if (emailExist) {
            throw http_errors_1.default.Conflict(`${req.body.email} is already been registered`);
        }
        const validUser = yield validateSchema_1.validateSchema.validateAsync(req.body);
        const user = yield user_model_1.User.create(validUser);
        yield user.save();
        res.status(201).send({ message: "Signup success..!!", success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.addUser = addUser;
/** This controller returns single user */
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: req.body.email });
        if (user) {
            res.status(200).json({ data: user, success: true });
            return;
        }
        res.status(404).json({ message: "user not found", success: false });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
