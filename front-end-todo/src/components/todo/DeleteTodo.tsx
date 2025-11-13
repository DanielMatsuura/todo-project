import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { useUser } from "@/hooks/useUser";
import { todoStore } from "@/stores/todoStore";
import toast from "react-hot-toast";

interface TodoActionsProps {
  todoId: string;
}

/**
 * Renders a dropdown menu item that allows the user to delete a Todo.
 * When selected, a confirmation dialog appears to confirm the action.
 * If confirmed, the Todo is deleted.
 */
const DeleteTodo: React.FC<TodoActionsProps> = ({ todoId }) => {
  const [open, setOpen] = useState(false);
  const { getAccessTokenSilently } = useUser();

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    await todoStore.deleteTodo(todoId, token);
    setOpen(false);
    toast.success("The todo was deleted successfully.");
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        className="w-52 cursor-pointer flex items-center gap-2"
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <Trash2Icon />
        Delete
      </DropdownMenuItem>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default DeleteTodo;
