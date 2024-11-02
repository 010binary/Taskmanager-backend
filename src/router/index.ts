import { Request, Response } from "express";
import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

router.get("/", (req: Request, res: Response) => {
  res.send(req.useragent).status(200);
});

export default router;
