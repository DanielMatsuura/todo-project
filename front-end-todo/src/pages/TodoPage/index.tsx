import AddTodo from "@/components/todo/AddTodo";
import TodoTable from "@/components/todo/TodoTable";
import { LuNotebookText } from "react-icons/lu";

/**
 * Main page for managing todos. 
 * Displays a button to add new todos and a table of existing todos.
 */
const TodoPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
      <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-1 w-full max-w-5xl px-2">
        <div className="flex justify-between items-center pl-1">
          <div className="flex items-center gap-2">
            <LuNotebookText size={24} />
            <h1 className="text-xl md:text-1xl font-bold text-gray-800">
              ToDo List
            </h1>
          </div>

          <AddTodo />
        </div>
        <TodoTable />
      </div>
    </div>)
};

export default TodoPage;
