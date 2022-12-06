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
const mongodb_1 = require("mongodb");
const EnvironmentVariableNotFoundException_1 = require("../../application/exceptions/EnvironmentVariableNotFoundException");
const URL = process.env.MONGO_URL;
if (!URL)
    throw new EnvironmentVariableNotFoundException_1.EnvironmentVariableNotFoundException();
const CLIENT = new mongodb_1.MongoClient(URL);
const DB_NAME = "school";
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield CLIENT.connect();
    const DB = CLIENT.db(DB_NAME);
    global.database = {
        mongo: DB,
        ObjectId: mongodb_1.ObjectId,
    };
    return `MongoDB is connected ✅`;
}))()
    .then(console.log)
    .catch(console.error);
//.finally(() => CLIENT.close());
