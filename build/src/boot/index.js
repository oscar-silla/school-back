"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
require("dotenv").config({
    path: `${__dirname}/env/${process.env.NODE_ENV}.env`,
});
const mongo_1 = require("../infrastructure/database/mongo");
const app_1 = __importDefault(require("./app"));
const createServer = () => {
    const port = process.env.PORT ? +process.env.PORT : 3010;
    return app_1.default.listen(port, () => console.log(`Server is listening on port ${port}`));
};
exports.createServer = createServer;
if (process.env.NODE_ENV !== "test") {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_1.mongo.createConnection();
    }))();
    createServer();
}
