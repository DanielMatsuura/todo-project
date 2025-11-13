import { makeAutoObservable, runInAction } from "mobx";
import type { TodoItem, TodoItemBase } from "@/types/TodoItem";
import { todoService } from "@/api/todoService";
import { limit_pagination } from "@/utils/constants";

/**
 * MobX store for managing Todos.
 * 
 * Provides methods to load, add, update, delete, and toggle todos.
 * Handles pagination, loading state, and keeps data reactive.
 */
class TodoStore {
  todos: TodoItem[] = [];
  total = 0;
  totalPages = 1;
  page = 1;
  limit = limit_pagination;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTodos(token: string) {
    this.loading = true;
    try {
      const response = await todoService.getAll(token, { page: this.page, limit: this.limit });

      runInAction(() => {
        this.todos = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addTodo(todo: TodoItemBase, token: string) {
    this.loading = true;
    try {
      await todoService.create(todo, token);

      const lastPage = Math.ceil((this.total + 1) / this.limit);

      runInAction(() => {
        this.page = lastPage;
      });

      await this.loadTodos(token);

    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async updateTodo(updatedTodo: Partial<TodoItem>, token: string) {
    const updated = await todoService.update(updatedTodo, token);
    runInAction(() => {
      this.todos = this.todos.map((t) => (t.id === updatedTodo.id ? updated : t));
    });
  }

  async deleteTodo(id: string, token: string) {
    this.loading = true;
    try {
      await todoService.delete(id, token);

      if (this.todos.length === 1 && this.page > 1) {
        this.page -= 1;
      }

      await this.loadTodos(token);

    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async toggleTodo(id: string, token: string) {
    const updated = await todoService.toggleState(id, token);
    runInAction(() => {
      this.todos = this.todos.map((t) => (t.id === id ? updated : t));
    });
  }

  setPage(page: number) {
    this.page = page;
  }

}

export const todoStore = new TodoStore();
