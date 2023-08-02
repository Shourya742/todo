"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});
const todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
    },
    userId: {
        type: String,
    },
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Todo = mongoose_1.default.model("Todo", todoSchema);
