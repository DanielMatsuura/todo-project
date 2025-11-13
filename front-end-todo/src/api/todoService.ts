import type { PaginatedResponse, PaginationParams, TodoItem, TodoItemBase } from "@/types/TodoItem";
import { axiosClient } from "./axiosClient";

export const todoService = {
  async getAll(
    token: string,
    paginationParams: PaginationParams
  ): Promise<PaginatedResponse<TodoItem>> {

    const { data } = await axiosClient.get<PaginatedResponse<TodoItem>>(
      `/todos?page=${paginationParams.page}&limit=${paginationParams.limit}`,
      getBearerTokenHeader(token)
    );

    return data;
  },

  async create(todo: TodoItemBase, token: string): Promise<TodoItem> {
    const { data } = await axiosClient.post("/todos", todo, getBearerTokenHeader(token));
    return data;
  },

  async update(todo: Partial<TodoItem>, token: string): Promise<TodoItem> {
    const { data } = await axiosClient.put(`/todos/${todo.id}`, todo, getBearerTokenHeader(token));
    return data;
  },

  async delete(id: string, token: string): Promise<void> {
    await axiosClient.delete(`/todos/${id}`, getBearerTokenHeader(token));
  },

  async toggleState(id: string, token: string): Promise<TodoItem> {
    const { data } = await axiosClient.patch(`/todos/${id}/toggle-state`, {}, getBearerTokenHeader(token));
    return data;
  },
};

export const getBearerTokenHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}
