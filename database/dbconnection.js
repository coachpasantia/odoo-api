import pg from "pg";
import { config } from "../config/defaults.js";

export const pool = new pg.Pool(config.database);
