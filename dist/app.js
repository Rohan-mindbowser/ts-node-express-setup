"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
app.get("/test", (req, res, next) => {
    res.send("Hello from server..");
});
//This middleware throws error if end point/url not found
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
//This middleware handles appilcation error
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ status: error.status || 500, message: error.message });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
