import { Resend } from "resend";
import { logger } from "@/utils/logger";
import envVars from "@/config/envVars";

class MailService {
	private resend: Resend;

	constructor() {
		this.resend = new Resend(envVars.RESEND_API_KEY);
	}

	async sendOTP(email: string, otp: string): Promise<void> {
		try {
			const { error } = await this.resend.emails.send({
				from: envVars.FROM_EMAIL || "noreply@verichain.com",
				to: email,
				subject: "Your OTP for VeriChain",
				html: `
					<div>
						<h2>VeriChain OTP</h2>
						<p>Your one-time password is: <strong>${otp}</strong></p>
						<p>This OTP will expire in 10 minutes.</p>
					</div>
				`,
			});

			if (error) {
				logger.error("[MAIL] Failed to send OTP email:", error);
				throw new Error("Failed to send OTP email");
			}

			logger.info(`[MAIL] OTP sent to ${email}`);
		} catch (error) {
			logger.error("[MAIL] Error sending OTP email:", error);
			throw error;
		}
	}
}

export default MailService;