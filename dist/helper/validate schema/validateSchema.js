"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateSchema = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string()
        .min(3)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
        "string.min": "Must have at least 8 characters",
        "string.pattern.base": "Password must contain only characters and numbers",
    }),
});
