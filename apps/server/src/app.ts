import createServer from "./utils/server";
import config from "config";
import logger from "./utils/logger";

const app = createServer();

// Start server
app.listen(config.get("PORT"), async () => {
  logger.info(
    `Server is running on port ${config.get("PORT")} in ${config.get("NODE_ENV")} mode`
  );
});
