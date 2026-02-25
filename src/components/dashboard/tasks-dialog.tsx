
"use client";

import { useData } from "@/hooks/use-data";
import { Project } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TaskItem } from "./task-item";
import { AddTaskForm } from "./add-task-form";

interface TasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export function TasksDialog({ open, onOpenChange, project }: TasksDialogProps) {
  const { getProjectTasks } = useData();
  const tasks = getProjectTasks(project.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Tasks for "{project.name}"</SheetTitle>
          <SheetDescription>
            View and manage all tasks associated with this project.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 py-4">
              {tasks.length > 0 ? (
                tasks.map((task) => <TaskItem key={task.id} task={task} />)
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No tasks have been added to this project yet.
                </div>
              )}
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="px-1">
             <h4 className="font-semibold mb-2">Add New Task</h4>
             <AddTaskForm projectId={project.id} onTaskAdded={() => {}} />
          </div>
        </div>
        <SheetFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
