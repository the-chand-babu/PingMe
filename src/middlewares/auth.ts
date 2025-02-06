import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

export const isAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["connect.sid"];
  if (!token) res.status(401).send({ message: "Not authrize" });
  console.log(req);
  next();
};


