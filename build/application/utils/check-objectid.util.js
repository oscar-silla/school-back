"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectId = void 0;
const checkObjectId = (id) => {
    const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    if (checkForHexRegExp.test(id)) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkObjectId = checkObjectId;
