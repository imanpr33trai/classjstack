import {type AppRouter} from "../server/index";
import {hc} from "hono/client";

const client = hc<AppRouter>("/");

export const api = client.api;