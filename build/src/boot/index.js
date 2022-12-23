"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const app_1 = __importDefault(require("./app"));
const createServer = () => {
    const port = process.env.PORT ? +process.env.PORT : 3010;
    return app_1.default.listen(port, () => console.log(`Server is listening on port ${port}`));
};
exports.createServer = createServer;
if (require.main === module) {
    createServer();
}
