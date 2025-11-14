import moduleAlias from "module-alias";
import path from "path";
import envVars from "./envVars";


const basePath = envVars.NODE_ENV === "production" ? "dist" : "src";
moduleAlias.addAliases({
	"@": path.join(process.cwd(), basePath),
});