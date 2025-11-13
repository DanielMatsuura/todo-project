import { Router } from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, toggleStateTodo, updateTodo } from "../controllers/todo.controller";
import { checkJwt } from "../middleware/auth";

const router = Router();

router.use(checkJwt);

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle-state", toggleStateTodo)

export default router;