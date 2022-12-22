"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariableNotFoundException = void 0;
class EnvironmentVariableNotFoundException extends Error {
    constructor() {
        super("404: Environment variable not found!");
    }
}
exports.EnvironmentVariableNotFoundException = EnvironmentVariableNotFoundException;
