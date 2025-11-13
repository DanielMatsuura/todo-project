import type { PaginatedResponse, PaginationParams, TodoItem, TodoItemBase } from "@/types/TodoItem";
import { axiosClient } from "../api/axiosClient";
import { GetErrorMessageAxios } from "@/utils/errors";

export const todoService = {
  async getAll(token: string, paginationParams: PaginationParams): Promise<PaginatedResponse<TodoItem>> {
    try {
      const { data } = await axiosClient.get<PaginatedResponse<TodoItem>>(
        `/todos?page=${paginationParams.page}&limit=${paginationParams.limit}`,
        getBearerTokenHeader(token)
      );
      return data;
    } catch (error: unknown) {
      throw new Error(GetErrorMessageAxios(error));
    }
  },

  async create(todo: TodoItemBase, token: string): Promise<TodoItem> {
    try {
      const { data } = await axiosClient.post("/todos", todo, getBearerTokenHeader(token));
      return data;
    } catch (error: unknown) {
      throw new Error(GetErrorMessageAxios(error));
    }
  },

  async update(todo: Partial<TodoItem>, token: string): Promise<TodoItem> {
    try {
      const { data } = await axiosClient.put(`/todos/${todo.id}`, todo, getBearerTokenHeader(token));
      return data;
    } catch (error: unknown) {
      throw new Error(GetErrorMessageAxios(error));
    }
  },

  async delete(id: string, token: string): Promise<void> {
    try {
      await axiosClient.delete(`/todos/${id}`, getBearerTokenHeader(token));
    } catch (error: unknown) {
      throw new Error(GetErrorMessageAxios(error));
    }
  },

  async toggleState(id: string, token: string): Promise<TodoItem> {
    try {
      const { data } = await axiosClient.patch(`/todos/${id}/toggle-state`, {}, getBearerTokenHeader(token));
      return data;
    } catch (error) {
      throw new Error(GetErrorMessageAxios(error));
    }
  },
};

export const getBearerTokenHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
