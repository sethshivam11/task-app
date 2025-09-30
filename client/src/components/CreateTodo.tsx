import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useTodo } from "@/context/TodoContextProvider";

export default function CreateTodo() {
  const [loading, setLoading] = useState(false);
  const { createTodo, createModal, setCreateModal } = useTodo();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    completed: false,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createTodo(todo)
    setTodo({ title: "", content: "", completed: false })
    setLoading(false)
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTodo({ ...todo, [input.name]: input.value });
  };
  return (
    <Dialog open={createModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Remember your tasks so that you don't forget any of them.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="create-title">Title</Label>
          <Input
            name="title"
            id="create-title"
            type="text"
            className="my-1"
            value={todo.title}
            onChange={handleChange}
          />
          <Label htmlFor="create-content">Task</Label>
          <Textarea
            name="content"
            id="create-content"
            className="my-1"
            value={todo.content}
            onChange={handleChange}
          />
          <DialogFooter>
            <Button
              type="submit"
              size="lg"
              className="mt-4"
              disabled={loading || !(todo.title.trim().length > 4) || !(todo.content.trim().length > 5)}
            >
              Create
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="reset"
              className="mt-4"
              onClick={() => {
                setCreateModal(false);
                setTodo({
                  title: "",
                  completed: false,
                  content: "",
                });
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
