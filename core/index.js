import { Server } from "./Server.js";
import {config} from "../config/defaults.js"


function main(config) {
  const server = new Server(config.api);
  server.start();
}

main(config);