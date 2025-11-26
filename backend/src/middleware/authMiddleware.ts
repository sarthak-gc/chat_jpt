import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserServices } from "../services/user.services";
import env from "../utils/env";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  try {
    const secret = env.JWT_SECRET;

    const decoded = jwt.verify(token, secret);
    req.userId = (decoded as JwtPayload).userId;

    const user = await UserServices.findById(req.userId);

    if (user) {
      next();
      return;
    }
    res.status(401).json({ message: "User not found" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token, authorization denied" });
    return;
  }
};

export default authMiddleware;
