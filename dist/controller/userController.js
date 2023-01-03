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
exports.uploadPhoto = exports.paginatedUsers = exports.loginUser = exports.getUser = exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const http_errors_1 = __importDefault(require("http-errors"));
const validateSchema_1 = require("../helper/validate schema/validateSchema");
const jwtHelper_1 = require("../helper/jwt helper/jwtHelper");
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
        const accessToken = yield (0, jwtHelper_1.generateAccessToken)(user);
        const refreshToken = yield (0, jwtHelper_1.generateRefreshToken)(user);
        res.status(201).send({
            message: "Signup success..!!",
            success: true,
            accessToken,
            refreshToken,
        });
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
/**This controller validates the user login */
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validUser = yield validateSchema_1.validateSchema.validateAsync(req.body);
        const user = yield user_model_1.User.findOne({ email: validUser.email });
        if (!user)
            throw http_errors_1.default.NotFound("User not found");
        if (user.password !== validUser.password)
            throw http_errors_1.default.BadRequest("Invalid email/password");
        const accessToken = yield (0, jwtHelper_1.generateAccessToken)(user);
        const refreshToken = yield (0, jwtHelper_1.generateRefreshToken)(user);
        res.send({ success: true, accessToken, refreshToken });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
/**THIS controller returns paginated users based on the limit and skip */
const paginatedUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(res.paginatedResults);
    }
    catch (error) {
        next(error);
    }
});
exports.paginatedUsers = paginatedUsers;
/**This controller handles photo upload */
const uploadPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("upload done");
    }
    catch (error) {
        next(error);
    }
});
exports.uploadPhoto = uploadPhoto;
