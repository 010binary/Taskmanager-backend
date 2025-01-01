import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { changestatus, updateprofile, getUser } from "@controller/profileController";
import { formdataMiddleware } from "@middleware/formdataMiddleware";

const router: Router = express.Router();

router.get("/", authMiddleware, getUser);
router.patch("/changestatus", authMiddleware, changestatus);
router.put(
  "/updateprofile",
  authMiddleware,
  formdataMiddleware,
  updateprofile
);

export default router;
