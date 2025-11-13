import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import type { TodoItem, TodoItemBase } from "@/types/TodoItem";
import { useForm } from "react-hook-form";
import { todoSchema, type TodoFormData } from "@/validation/todoSchema";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (todo: TodoItemBase) => Promise<void>;
  todoToEdit?: TodoItem;
}

/**
 * A modal dialog containing a form to **create** or **edit** a Todo item.
 * It uses React Hook Form and Zod for form validation and handles asynchronous submissions.
 * The dialog is used both for adding new tasks and editing existing ones.
 */
const TodoFormDialog: React.FC<Props> = ({ open, onOpenChange, onSubmit, todoToEdit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todoToEdit?.title ?? "",
      description: todoToEdit?.description ?? "",
    },
  });

  const onFormSubmit = async (data: TodoFormData) => {
    setLoading(true);
    try {
      await onSubmit(data);
      onOpenChange(false);
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle>{todoToEdit ? "Edit To Do" : "Add To Do"}</DialogTitle>
            <DialogDescription>
              {todoToEdit
                ? "Edit the details of your existing task."
                : "Fill in the title and description to add a new task."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="cursor-pointer" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {loading && <Spinner />}{todoToEdit ? "Save changes" : "Add To Do"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoFormDialog;
