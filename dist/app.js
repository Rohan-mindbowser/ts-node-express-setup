"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
(0, dotenv_1.config)();
const PORT = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
// //This will log all the requests
// app.use(morgan("common"));
// log only 4xx and 5xx responses to console
app.use(morgan("common", {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
}));
// log all requests to access.log
app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/error.log"), {
        flags: "a",
    }),
}));
app.get("/test", (req, res, next) => {
    res.send("Hello from server..");
});
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
