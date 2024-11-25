import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "@middleware/logger";
import useragent from "express-useragent";
import router from "./router/";
import "./register-paths";

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
app.use(useragent.express());
app.use(express.static("./public"));
// Custom middleware
app.use(logger);

// Routes
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
