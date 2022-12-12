"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const bodyParser = __importStar(require("body-parser"));
const index_1 = require("./routes/index");
//To surpass the strictQuery deprecation warning
mongoose_1.default.set("strictQuery", false);
const PORT = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
const db = require("./config/db");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
(0, dotenv_1.config)();
//To process request body data
app.use(bodyParser.json());
//This will log all the requests
app.use(morgan("dev"));
//Checking DB connection here
db.once("open", function () {
    console.log("MongoDB database connection established successfully");
});
// log all requests to access.log
app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), {
        flags: "a",
    }),
}));
// routes
app.use("/api", index_1.routes);
//This middleware throws error if end point/url not found
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound("URL not found"));
});
//This middleware handles application error
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ status: error.status || 500, message: error.message });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
