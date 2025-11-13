import { useState } from "react";
import { Button } from "../ui/button";
import TodoFormDialog from "./TodoFormDialog";
import type { TodoItemBase } from "@/types/TodoItem";
import { useUser } from "@/hooks/useUser";
import { todoStore } from "@/stores/todoStore";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";

/**
 * Displays a button that opens a dialog to add a new Todo item.
 */
const AddTodo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { getAccessTokenSilently } = useUser();

  const handleAddTodo = async (todo: TodoItemBase) => {
    const token = await getAccessTokenSilently();
    await todoStore.addTodo(todo, token);
    toast.success("The todo was added successfully.");
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="cursor-pointer px-2 border-gray-600"
      >
        <div className="flex gap-1 items-center">
          <IoMdAddCircleOutline />
          Add To Do
        </div>
      </Button>

      <TodoFormDialog open={open} onOpenChange={setOpen} onSubmit={handleAddTodo} />
    </>
  );
};

export default AddTodo;
