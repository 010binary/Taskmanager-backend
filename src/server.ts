import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./register-paths";
import pino from "@middleware/productionLogs";
import router from "./router/";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swaggerSpecs";
import path from "node:path";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
// Custom middleware
app.use(pino);

// Routes
app.use("/api/v1", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api-docs");
});
app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
