import express, { Router } from "express";
import { register, login, logout, refresh } from "@controller/authController";
import { tokenMiddleware } from "@middleware/tokenMiddleware";

const router: Router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", tokenMiddleware, refresh);

router.post("/logout", tokenMiddleware, logout);

export default router;
