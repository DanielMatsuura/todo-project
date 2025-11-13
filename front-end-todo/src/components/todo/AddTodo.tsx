import { useState } from "react";
import { Button } from "../ui/button";
import TodoFormDialog from "./TodoFormDialog";
import type { TodoItemBase } from "@/types/TodoItem";
import { useUser } from "@/hooks/useUser";
import { todoStore } from "@/stores/todoStore";

/**
 * Displays a button that opens a dialog to add a new Todo item.
 */
const AddTodo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { getAccessTokenSilently } = useUser();

  const handleAddTodo = async (todo: TodoItemBase) => {
    const token = await getAccessTokenSilently();
    await todoStore.addTodo(todo, token);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="cursor-pointer">
        Add To Do
      </Button>

      <TodoFormDialog open={open} onOpenChange={setOpen} onSubmit={handleAddTodo} />
    </>
  );
};

export default AddTodo;
