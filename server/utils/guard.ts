import { NextFunction, Request, Response } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

const permit = new Bearer({
  query: "access_token",
});

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = permit.check(req);

    if (!token) {
      return res.status(400).json({ msg: "You haven't logged in" });
    }

    const decoded = jwtSimple.decode(token, process.env.JWT_SECRET!);

    req.body.userId = decoded.userId;
    req.body.username = decoded.username;

    return next();
  } catch (e) {
    return res.status(400).json({ msg: "You haven't logged in" });
  }
}
