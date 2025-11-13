import AddTodo from "@/components/todo/AddTodo";
import TodoTable from "@/components/todo/TodoTable";

/**
 * Main page for managing todos. 
 * Displays a button to add new todos and a table of existing todos.
 */
const TodoPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
      <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-1 w-full max-w-4xl px-2">
        <div className="flex justify-end">
          <AddTodo />
        </div>
        <TodoTable />
      </div>
    </div>)
};

export default TodoPage;
