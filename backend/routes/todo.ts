import express from "express";
import { authenticateJwt } from "../middleware";
import { Todo } from "../db";
import router from "express";

router.post("/todos", authenticateJwt, async (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.userId;
  const newTodo = new Todo({ title, description, done, userId });
  await newTodo.save();
  res.status(201).json(newTodo);
});

router.get("/todos", authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const todos = await Todo.find({ userId });
  res.json(todos);
});

router.patch("/todos/:todoId/done", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.userId;
  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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

export default router;
