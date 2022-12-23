require("dotenv").config({ path: `${__dirname}/.env` });
require("../infrastructure/database/mongo");
import express from "express";
import errorHandler from "../api/middlewares/error-handler.middleware";
import api from "../api/routes/api";

const app = express();
app.use(express.json());

app.use("/api/v1", api);

app.use(errorHandler);

export default app;