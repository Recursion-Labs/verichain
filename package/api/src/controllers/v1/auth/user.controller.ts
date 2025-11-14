import catchAsync from "@/handlers/async.handler";
import type { Request, Response } from "express";
import { db } from "@/config/database";
import MailService from "@/services/mail.service";
import CacheService from "@/services/cache.service";

const mailService = new MailService();
const cacheService = new CacheService();

const generateOTP = (): string => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = catchAsync(async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email) {
		res.status(400).json({ message: "Email is required" });
		return;
	}

	// Check if user already exists
	const existingUser = await db.user.findUnique({
		where: { email }
	});

	if (existingUser) {
		res.status(400).json({ message: "User already exists" });
		return;
	}

	// Generate OTP
	const otp = generateOTP();

	// Store OTP in cache
	cacheService.setOTP(email, otp);

	// Send OTP email
	await mailService.sendOTP(email, otp);

	res.status(200).json({ message: "OTP sent to email for registration" });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email) {
		res.status(400).json({ message: "Email is required" });
		return;
	}

	// Check if user exists
	const user = await db.user.findUnique({
		where: { email }
	});

	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	// Generate OTP
	const otp = generateOTP();

	// Store OTP in cache
	cacheService.setOTP(email, otp);

	// Send OTP email
	await mailService.sendOTP(email, otp);

	res.status(200).json({ message: "OTP sent to email for login" });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
	const { email, otp } = req.body;

	if (!email || !otp) {
		res.status(400).json({ message: "Email and OTP are required" });
		return;
	}

	// Get stored OTP
	const storedOTP = cacheService.getOTP(email);

	if (!storedOTP || storedOTP !== otp) {
		res.status(400).json({ message: "Invalid or expired OTP" });
		return;
	}

	// Delete OTP from cache
	cacheService.deleteOTP(email);

	// Check if user exists for registration or login
	let user = await db.user.findUnique({
		where: { email }
	});

	if (!user) {
		// Register new user
		user = await db.user.create({
			data: {
				email,
				name: email.split('@')[0], // Use email prefix as name
				password: '' // Empty password for OTP auth
			}
		});
	}

	res.status(200).json({
		message: "OTP verified successfully",
		user: {
			id: user.id,
			email: user.email
		}
	});
});

export default { registerUser, loginUser, verifyOTP }