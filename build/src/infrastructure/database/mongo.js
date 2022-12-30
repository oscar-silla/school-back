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
exports.mongo = void 0;
const mongodb_1 = require("mongodb");
const EnvironmentVariableNotFoundException_1 = require("../../application/exceptions/EnvironmentVariableNotFoundException");
const connection_message_util_1 = require("./utils/connection-message.util");
const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
if (!URL)
    throw new EnvironmentVariableNotFoundException_1.EnvironmentVariableNotFoundException();
const mongoClient = new mongodb_1.MongoClient(URL);
const DB_NAME = "school";
const createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoClient.connect();
    const DB = mongoClient.db(DB_NAME);
    global.database = {
        mongo: DB,
        ObjectId: mongodb_1.ObjectId,
    };
    return (0, connection_message_util_1.successConnetionMessage)();
});
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoClient.close();
});
const mongo = { createConnection, closeConnection };
exports.mongo = mongo;
