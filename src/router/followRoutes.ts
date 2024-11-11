import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { getFollowsCount } from "@controller/followController";

const router: Router = express.Router();

router.get("/", authMiddleware, getFollowsCount);

export default router;
