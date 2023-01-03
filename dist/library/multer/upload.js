"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.storage = void 0;
const path_1 = __importDefault(require("path"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//storage for image upload
exports.storage = multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
//file filter for extention
const fileFilter = function (req, file, cb) {
    console.log(file.mimetype);
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
