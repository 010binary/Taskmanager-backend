import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { changestatus, updateprofile } from "@controller/profileController";
import { formdataMiddleware } from "@middleware/formdataMiddleware";

const router: Router = express.Router();

router.post("/changestatus", authMiddleware, changestatus);
router.post(
  "/updateprofile",
  authMiddleware,
  formdataMiddleware,
  updateprofile
);

export default router;
