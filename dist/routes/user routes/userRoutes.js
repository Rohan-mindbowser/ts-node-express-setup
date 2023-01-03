"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const userController_1 = require("../../controller/userController");
const jwtHelper_1 = require("../../helper/jwt helper/jwtHelper");
const upload_1 = require("../../library/multer/upload");
const commonMiddleware_1 = require("../../middleware/common/commonMiddleware");
const user_model_1 = require("../../models/user.model");
const multer = require("multer");
//upload for to pass storage, file size limit and filter
//maximum file size is 10Mb
const upload = multer({
    storage: upload_1.storage,
    limits: { fileSize: 10 ** 7 },
    fileFilter: upload_1.fileFilter,
});
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post("/adduser", userController_1.addUser);
exports.userRoute.get("/getuser", jwtHelper_1.verifyAccessToken, userController_1.getUser);
exports.userRoute.post("/loginuser", userController_1.loginUser);
exports.userRoute.get("/paginatedusers", jwtHelper_1.verifyAccessToken, (0, commonMiddleware_1.paginatedResults)(user_model_1.User), userController_1.paginatedUsers);
exports.userRoute.post("/uploadphoto", upload.single("avatar"), userController_1.uploadPhoto);
