import { Router } from "express";

export const userRoute = Router();

userRoute.get("/test", (req, res) => {
  res.send("What's up doc ?!");
});
