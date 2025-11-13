import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";
import EditTodoOption from "./EditTodo";
import { formatDate } from "@/utils/date";
import { observer } from "mobx-react-lite";
import DeleteTodoOption from "./DeleteTodo";
import ToggleStatusTodo from "./ToggleStatusTodo";
import { useUser } from "@/hooks/useUser";
import { todoStore } from "@/stores/todoStore";
import toast from "react-hot-toast";
import { GetErrorMessage } from "@/utils/errors";

/**
 * Displays a paginated table of todos with options to edit, delete, and toggle status.
 */
const TodoTable: React.FC = observer(() => {
  const { getAccessTokenSilently } = useUser();
  const { page, totalPages } = todoStore;

  const loadTodosHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      await todoStore.loadTodos(token);
    } catch (error) {
      toast.error(GetErrorMessage(error));
    }
  };

  useEffect(() => {
    loadTodosHandler();
  }, [page]);

  const handlePrev = () => {
    if (todoStore.page > 1) {
      todoStore.setPage(todoStore.page - 1);
    }
  };

  const handleNext = () => {
    if (todoStore.page < todoStore.totalPages) {
      todoStore.setPage(todoStore.page + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todoStore.todos?.length < 1 &&
          <TableRow>
            <TableCell colSpan={6} className="p-2 text-center">
              <span>No tasks available...</span>
            </TableCell>
          </TableRow>
        }
        {todoStore.todos?.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell className="w-25">{task.state}</TableCell>
            <TableCell className="w-20">{formatDate(task.creationDate)}</TableCell>
            <TableCell className="w-1.5">
              <ButtonGroup>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <MoreHorizontalIcon size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <ToggleStatusTodo todo={task} />
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <EditTodoOption todo={task} />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DeleteTodoOption todoId={task.id} />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-white" hidden={todoStore.todos.length < 1}>
        <TableRow>
          <TableCell colSpan={6} className="p-1 pb-0">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="text-[12px] h-8 cursor-pointer"
                    onClick={handlePrev}
                  />
                </PaginationItem>

                {pages.map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        todoStore.setPage(num);
                      }}
                      className="text-[12px] h-8 cursor-pointer"
                      isActive={num === page}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > 5 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationNext
                    className="text-[12px] h-8 cursor-pointer"
                    onClick={handleNext}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
});

export default TodoTable;

