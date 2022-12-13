"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const userController_1 = require("../../controller/userController");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post("/adduser", userController_1.addUser);
exports.userRoute.get("/getuser", userController_1.getUser);
