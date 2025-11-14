import { logger } from "@/utils/logger";
import { PrismaClient } from "../../generated/prisma";

interface CustomNodeJsGlobal {
	prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

export const db = global.prisma || new PrismaClient();

db.$connect()
	.then(() => {
		logger.info("[PRISMA] : connected to database");
	})
	.catch((error: string) => {
		logger.error("[PRISMA] : failed to connect database : ", error);
	});