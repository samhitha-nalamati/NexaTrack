
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useData } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  assigneeId: z.string().min(1, "Assignee is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface AddTaskFormProps {
  projectId: string;
  onTaskAdded: () => void;
}

export function AddTaskForm({ projectId, onTaskAdded }: AddTaskFormProps) {
  const { users, addTask } = useData();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      assigneeId: "",
    },
  });

  function onSubmit(data: TaskFormValues) {
    addTask(projectId, {
      name: data.name,
      description: data.description || "",
      status: 'Pending',
      assigneeId: data.assigneeId
    });
    form.reset();
    onTaskAdded();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="New task name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
            <FormField
            control={form.control}
            name="assigneeId"
            render={({ field }) => (
                <FormItem className="flex-1">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" size="icon" className="shrink-0">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </form>
    </Form>
  );
}
