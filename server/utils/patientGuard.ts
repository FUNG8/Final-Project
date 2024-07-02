import { NextFunction, Request, Response } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

const permit = new Bearer({
  query: "access_token",
});

export async function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = permit.check(req);

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const decoded = jwtSimple.decode(token, process.env.JWT_SECRET!);

    if (!decoded.hkid) {
      return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }

    req.body.hkid = decoded.hkid;
    console.log("Decoded HKID:", decoded.hkid); // Debug log

    return next();
  } catch (e) {
    console.error("Error decoding token:", e); // Debug log
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
}