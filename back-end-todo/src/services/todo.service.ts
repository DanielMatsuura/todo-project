import type { ITodo } from "../models/Todo";
import Todo, { TodoStatus } from "../models/Todo";

export const getTodosService = async (
  page: number,
  limit: number,
  userId: string | undefined,
): Promise<{ data: ITodo[]; total: number; totalPages: number }> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Todo.find({ userId }).skip(skip).limit(limit),
    Todo.countDocuments({ userId })
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTodoByIdService = async (id: string): Promise<ITodo | null> => {
  return await Todo.findById(id);
};

export const createTodoService = async (data: Partial<ITodo>): Promise<ITodo> => {
  return await Todo.create(data);
};

export const updateTodoService = async (id: string, data: Partial<ITodo>): Promise<ITodo | null> => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodoService = async (id: string): Promise<ITodo | null> => {
  return await Todo.findByIdAndDelete(id);
};

export const toggleStatusTodoService = async (id: string): Promise<ITodo | null> => {
  var todoUpdated = await Todo.findById(id);

  if (!todoUpdated) throw Error("Todo not found");

  todoUpdated.state = todoUpdated.state === TodoStatus.Pending ? TodoStatus.Completed : TodoStatus.Pending;

  await todoUpdated.save();
  return todoUpdated;
}
