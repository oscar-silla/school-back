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
exports.SectionsCollection = void 0;
class SectionsCollection {
    save(section) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongo } = global.database;
            return yield mongo.collection("sections").insertOne(section);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongo } = global.database;
            return yield mongo.collection("sections").find({}).toArray();
        });
    }
    findOne(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongo } = global.database;
            return yield mongo.collection("sections").findOne({ ref });
        });
    }
    modifyOne(ref, section) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongo } = global.database;
            return yield mongo
                .collection("sections")
                .updateOne({ ref }, { $set: section });
        });
    }
    deleteOne(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongo } = global.database;
            yield mongo.collection("sections").deleteOne({ ref });
        });
    }
}
exports.SectionsCollection = SectionsCollection;
