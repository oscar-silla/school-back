import express from "express";
import errorHandler from "../api/middlewares/error-handler.middleware";
import api from "../api/routes/api";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());

app.use("/api/v1", api);

app.use(errorHandler);

export default app;
