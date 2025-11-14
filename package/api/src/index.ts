import "./config/moduleAlias";
import app from "./app";
import { logger } from "./utils/logger";
import envVars from "./config/envVars";


app.listen(envVars.PORT, () => {
	logger.info(`[SERVER] backend is live on http://localhost:${envVars.PORT}`);
});