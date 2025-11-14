import NodeCache from "node-cache";
import { logger } from "@/utils/logger";

class CacheService {
	private cache: NodeCache;

	constructor() {
		// TTL: 10 minutes (600 seconds)
		this.cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });
	}

	setOTP(email: string, otp: string): void {
		try {
			this.cache.set(`otp:${email}`, otp);
			logger.info(`[CACHE] OTP set for ${email}`);
		} catch (error) {
			logger.error("[CACHE] Error setting OTP:", error);
			throw error;
		}
	}

	getOTP(email: string): string | undefined {
		try {
			const otp = this.cache.get<string>(`otp:${email}`);
			if (otp) {
				logger.info(`[CACHE] OTP retrieved for ${email}`);
			} else {
				logger.warn(`[CACHE] OTP not found for ${email}`);
			}
			return otp;
		} catch (error) {
			logger.error("[CACHE] Error getting OTP:", error);
			throw error;
		}
	}

	deleteOTP(email: string): void {
		try {
			const deleted = this.cache.del(`otp:${email}`);
			if (deleted) {
				logger.info(`[CACHE] OTP deleted for ${email}`);
			} else {
				logger.warn(`[CACHE] OTP not found for deletion: ${email}`);
			}
		} catch (error) {
			logger.error("[CACHE] Error deleting OTP:", error);
			throw error;
		}
	}
}

export default CacheService;