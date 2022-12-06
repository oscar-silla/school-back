"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: `${__dirname}/.env` });
require("../infrastructure/database/mongo");
const express_1 = __importDefault(require("express"));
const error_handler_middleware_1 = __importDefault(require("../api/middlewares/error-handler.middleware"));
const api_1 = __importDefault(require("../api/routes/api"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", api_1.default);
app.use(error_handler_middleware_1.default);
const PORT = process.env.PORT ? +process.env.PORT : 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
