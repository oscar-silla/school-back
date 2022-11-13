require("dotenv").config({ path: `${__dirname}/.env` });
require("../infrastructure/database/mongo");
import express from "express";
const api = express();
api.use(express.json());

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
api.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
