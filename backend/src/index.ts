import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import env from "./utils/env";
const app = express();
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);
app.listen(env.PORT);
