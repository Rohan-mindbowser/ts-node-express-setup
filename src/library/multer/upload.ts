import { Request, Response, NextFunction } from "express";
import path from "path";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//storage for image upload
export const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req: Request, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter for extention
export const fileFilter = function (req: Request, file: any, cb: any) {
  console.log(file.mimetype);
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
