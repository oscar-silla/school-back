require("dotenv").config({ path: `${__dirname}/.env` });
require("../infrastructure/database/mongo");
import express from "express";
import api from "../api/routes/api";

const app = express();
app.use(express.json());

app.use("/api/v1", api);

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
