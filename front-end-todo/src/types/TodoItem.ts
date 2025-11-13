export type TodoItem = {
  id: string;
  title: string;
  description: string;
  state: string;
  creationDate: string;
};

export type TodoItemBase = Omit<TodoItem, "id" | "state" | "creationDate">;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
}

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export const TodoStatus = {
  Pending: "Pending",
  Completed: "Completed",
} as const;

export type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus];

