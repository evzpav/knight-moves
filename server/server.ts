import * as express from "express";
const app = express();
import * as cors from "cors";
import * as bodyParser from "body-parser";
import config from "./config/config";
import { router } from "./router/index";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "500kb" }));
app.use(bodyParser.json({ limit: "500kb" }));

app.use((req, res, next) => {
  res.header("X-XSS-Protection", "0");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "SAMEORIGIN");
  next();
});

import { Storage } from "./storage/storage";
import { ChessService } from "./services/chessService";
import { Controller } from "./controllers/controller";

const StorageInstance = Storage(config.mongoUrl, "knight_moves", "possible_moves");
const ChessServiceInstance = ChessService(StorageInstance);
const ControllerInstance = Controller(ChessServiceInstance);

router(app, ControllerInstance);

const server = app.listen(config.port, "localhost", 1, (err: any) => {
  if (err) {
    console.error("Could not initiate express server: ", err);
    process.exit(1);
  }
  console.info(`App listening on port ${config.port}; http://localhost:${config.port}`);
});

function stop() {
  server.close(() => {
    console.info("Server closed");
    process.exit();
  });
}

process.on("SIGINT", () => {
  console.info("Closing server...");

  stop();

  // Force close server after 5 secs
  setTimeout(e => {
    console.warn("Forcing server close", e);
    process.exit(1);
  }, 5001);
});

module.exports = app;
module.exports.stop = stop;
