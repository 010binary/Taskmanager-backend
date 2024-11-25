import express, { Router } from "express";
import {
  register,
  login,
  logout,
  refresh,
  checkmail,
  forgotPassword,
  changePassword,
} from "@controller/authController";
import { tokenMiddleware } from "@middleware/tokenMiddleware";
import { authMiddleware } from "@middleware/authMiddleware";

const router: Router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", tokenMiddleware, refresh);

router.post("/logout", tokenMiddleware, logout);

router.post("/checkmail", checkmail);

router.post("/forgotpassword", authMiddleware, forgotPassword);

router.post("/changepassword", authMiddleware, changePassword);

export default router;
