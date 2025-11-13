import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Clock, SquareCheckBig } from "lucide-react";
import { todoStore } from "@/stores/todoStore";
import { useUser } from "@/hooks/useUser";
import { TodoStatus, type TodoItem } from "@/types/TodoItem";

interface Props {
  todo: TodoItem;
}

/**
 * This component renders a dropdown menu item that allows the user
 * to toggle the status of a todo between Pending and Completed.
 */
const ToggleStatusTodo: React.FC<Props> = ({ todo }) => {
  const { getAccessTokenSilently } = useUser();

  const handleToggle = async () => {
    await todoStore.toggleTodo(todo.id, await getAccessTokenSilently());
  };

  return (
    <>
      <DropdownMenuItem
        className="w-52 cursor-pointer flex gap-2"
        onSelect={(e) => {
          e.preventDefault();
          handleToggle();
        }}
      >
        {todo.state == TodoStatus.Pending ? <SquareCheckBig size={18} /> : <Clock size={18} />}
        {todo.state == TodoStatus.Pending ? "Mark as Completed" : "Mark as Pending"}
      </DropdownMenuItem>
    </>
  );
};

export default ToggleStatusTodo;
