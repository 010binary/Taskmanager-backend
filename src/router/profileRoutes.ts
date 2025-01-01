import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { changestatus, updateprofile, getUser } from "@controller/profileController";
import { formdataMiddleware } from "@middleware/formdataMiddleware";

const router: Router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/changestatus", authMiddleware, changestatus);
router.post(
  "/updateprofile",
  authMiddleware,
  formdataMiddleware,
  updateprofile
);

export default router;
