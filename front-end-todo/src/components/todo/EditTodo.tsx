import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { SquarePen } from "lucide-react";
import TodoFormDialog from "./TodoFormDialog";
import type { TodoItem, TodoItemBase } from "@/types/TodoItem";
import { todoStore } from "@/stores/todoStore";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

interface Props {
  todo: TodoItem;
}

/**
 * Renders a dropdown menu item that allows the user to edit an existing Todo.
 * When selected, it opens a dialog with a form pre-filled with the Todo's current data.
 * After submitting the form, the Todo is updated.
 */
const EditTodoButton: React.FC<Props> = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const { getAccessTokenSilently } = useUser();

  const handleUpdate = async (updatedTodo: TodoItemBase) => {
    await todoStore.updateTodo(
      {
        ...todo,
        ...updatedTodo
      },
      await getAccessTokenSilently()
    );
    toast.success("The todo was edited successfully.");
  };

  return (
    <>
      <DropdownMenuItem
        className="w-52 cursor-pointer flex gap-2"
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <SquarePen size={18} />
        Edit
      </DropdownMenuItem>

      <TodoFormDialog
        open={open}
        onOpenChange={setOpen}
        todoToEdit={todo}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default EditTodoButton;
