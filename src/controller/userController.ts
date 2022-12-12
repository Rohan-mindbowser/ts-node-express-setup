import express, { Request, Response, NextFunction } from "express";

export const test = (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from user...")
};
