"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const notFoundHandler = (req, res) => {
    return (0, responseHandler_1.errorResponse)(res, "Not Found", [], 404);
};
exports.notFoundHandler = notFoundHandler;
