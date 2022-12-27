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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./library/Logger/logger"));
// import { config as devConfig } from "./config/development.config";
const config_1 = require("./config/config");
const dotenv_1 = require("dotenv");
const index_1 = require("./routes/index");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
/** To surpass the strictQuery deprecation warning */
mongoose_1.default.set("strictQuery", false);
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(() => {
    logger_1.default.info("Mongo connected successfully.");
    StartServer();
})
    .catch((error) => logger_1.default.error(error));
/** Only Start Server if Mongoose Connects */
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** Log the request */
        app.use((req, res, next) => {
            /** Log the req */
            logger_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            res.on("finish", () => {
                if (res.statusCode >= 400 && res.statusCode <= 599) {
                    /** Log the error res */
                    logger_1.default.error(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
                    return;
                }
                /** Log the res */
                logger_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
            });
            next();
        });
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        // routes
        app.use("/api", index_1.routes);
        /** Healthcheck */
        app.get("/test", (req, res, next) => res.status(200).json({ hello: "world" }));
        //This middleware handles application error
        const errorHandler = (error, req, res, next) => {
            res.status(error.status || 500);
            res.send({ status: error.status || 500, message: error.message });
        };
        app.use(errorHandler);
        /** Error handling */
        app.use((req, res, next) => {
            const error = new Error("Not found");
            logger_1.default.error(error);
            res.status(404).json({
                message: error.message,
            });
        });
        app.listen(process.env.PORT, () => {
            logger_1.default.info(`Server running on PORT :${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
