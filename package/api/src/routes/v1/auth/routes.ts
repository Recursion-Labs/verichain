import { v1Controllers } from "@/controllers";
import { Router } from "express";

const router = Router()

router.post("/register", v1Controllers.authControllers.user.registerUser)
router.post("/login", v1Controllers.authControllers.user.loginUser)
router.post("/verify-otp", v1Controllers.authControllers.user.verifyOTP)

export default router;