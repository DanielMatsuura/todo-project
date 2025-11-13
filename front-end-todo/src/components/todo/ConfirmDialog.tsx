import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleDelete: () => Promise<void>;
}

/**
 * Displays a confirmation dialog used for critical actions, such as deleting a task.
 * When the user confirms, it executes the provided asynchronous `handleDelete` function.
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onOpenChange, handleDelete }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await handleDelete();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-4">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="cursor-pointer"
            disabled={loading}
          >
            {loading && <Spinner />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
