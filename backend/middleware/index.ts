import jwt from "jsonwebtoken";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!user) {
        return res.sendStatus(403);
      }
      if (typeof user === "string") {
        return res.sendStatus(403);
      }
      req.headers["userId"] = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
