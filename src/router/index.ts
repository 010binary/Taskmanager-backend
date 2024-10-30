import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/v1", (req: Request, res: Response) => {
  res.send(req.useragent).status(200);
});

export default router;
