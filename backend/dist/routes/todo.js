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
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = express_1.default.Router();
router.post("/todos", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const done = false;
    const userId = req.headers["userId"];
    const newTodo = new db_1.Todo({ title, description, done, userId });
    yield newTodo.save();
    res.status(201).json(newTodo);
}));
router.get("/todos", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const todos = yield db_1.Todo.find({ userId });
    res.json(todos);
}));
router.patch("/todos/:todoId/done", middleware_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to update todo" });
    });
});
exports.default = router;
