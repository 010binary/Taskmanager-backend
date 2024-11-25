import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import {
  getFollowsCount,
  getFollower,
  getFollowing,
  addfollow,
  removefollow,
} from "@controller/followController";

const router: Router = express.Router();

router.get("/getcount", authMiddleware, getFollowsCount);

router.get("/getfollower", authMiddleware, getFollower);

router.get("/getfollowing", authMiddleware, getFollowing);

router.post("/followuser", authMiddleware, addfollow);

router.post("/unfollowuser", authMiddleware, removefollow);

export default router;
