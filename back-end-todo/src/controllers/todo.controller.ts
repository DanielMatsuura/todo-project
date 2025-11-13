import type { Request, Response } from "express";
import { createTodoService, deleteTodoService, getTodoByIdService, getTodosService, toggleStatusTodoService as toggleStateTodoService, updateTodoService } from "../services/todo.service";
import { limit_pagination } from "../utils/constants";

export const getTodos = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || limit_pagination;
  const userId = req.auth?.payload.sub;

  const todos = await getTodosService(page, limit, userId);
  res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Todo Id is required" });

  const todo = await getTodoByIdService(id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.auth?.payload.sub;
  if (!userId) {
    return res.status(400).json({ message: "Todo userId is required" });
  }

  const { title, description } = req.body;
  const todo = await createTodoService({ title, description, userId });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Todo Id is required" });

  const { title, description } = req.body;
  const updatedTodo = await updateTodoService(id, { title, description });

  if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

  res.json(updatedTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Todo Id is required" });

  const deletedTodo = await deleteTodoService(id);
  if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo deleted successfully" });
};

export const toggleStateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Todo Id is required" });

    const updatedTodo = await toggleStateTodoService(id);

    res.json(updatedTodo);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
