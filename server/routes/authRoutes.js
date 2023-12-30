import express from "express";
import {
  registerUser,
  loginUser,
  sendResetPasswordEmail,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", sendResetPasswordEmail);
export default router;
