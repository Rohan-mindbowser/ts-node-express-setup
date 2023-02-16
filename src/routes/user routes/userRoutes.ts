import { Router } from "express";
import {
  addUser,
  getUser,
  loginUser,
  paginatedUsers,
  redisPhotos,
  uploadPhoto,
} from "../../controller/userController";
import { verifyAccessToken } from "../../helper/jwt helper/jwtHelper";
import { fileFilter, storage } from "../../library/multer/upload";
import { paginatedResults } from "../../middleware/common/commonMiddleware";
import { User } from "../../models/user.model";
const multer = require("multer");

//upload for to pass storage, file size limit and filter
//maximum file size is 10Mb
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 ** 7 },
  fileFilter: fileFilter,
});

export const userRoute = Router();

userRoute.post("/adduser", addUser);
userRoute.get("/getuser", verifyAccessToken, getUser);
userRoute.post("/loginuser", loginUser);
userRoute.get(
  "/paginatedusers",
  verifyAccessToken,
  paginatedResults(User),
  paginatedUsers
);
userRoute.post("/uploadphoto", upload.single("avatar"), uploadPhoto);
userRoute.get("/get-all-photos", redisPhotos);
