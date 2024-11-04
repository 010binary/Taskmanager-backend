import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const value = authHeader.split(" ")[1];
    const payload = await verifyToken(value);
    req.body.payload = payload;
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    res.status(401).json({ message });
    return;
  }
};
