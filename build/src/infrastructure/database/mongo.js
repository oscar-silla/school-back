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
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
const EnvironmentVariableNotFoundException_1 = require("../../application/exceptions/EnvironmentVariableNotFoundException");
const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
if (!URL)
    throw new EnvironmentVariableNotFoundException_1.EnvironmentVariableNotFoundException();
const client = new mongodb_1.MongoClient(URL);
exports.client = client;
const DB_NAME = "school";
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const DB = client.db(DB_NAME);
    global.database = {
        mongo: DB,
        ObjectId: mongodb_1.ObjectId,
    };
    return `MongoDB is connected ✅`;
}))()
    .then(console.log)
    .catch(console.error);
