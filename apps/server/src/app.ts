import createServer from "./utils/server";
import config from "config";

const app = createServer();

// Start server
app.listen(config.get("PORT"), async () => {
  console.log(
    `Server is running on port ${config.get("PORT")} in ${config.get("NODE_ENV")} mode`
  );
});
