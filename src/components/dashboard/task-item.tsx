
"use client";

import { Task } from "@/lib/types";
import { useData } from "@/hooks/use-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TaskItem({ task }: { task: Task }) {
  const { getUserById, updateTask } = useData();
  const assignee = getUserById(task.assigneeId);

  return (
    <div className="flex flex-col gap-2 rounded-md border p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatarUrl} />
              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <span className="font-medium">{task.name}</span>
        </div>
        <Select
          value={task.status}
          onValueChange={(value) => updateTask(task.id, { status: value as Task['status'] })}
        >
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In-Progress">In-Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Slider
            value={[task.progress]}
            max={100}
            step={1}
            onValueChange={(value) => updateTask(task.id, { progress: value[0] })}
            className="flex-1"
          />
          <span className="text-xs font-semibold w-10 text-right">
            {task.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
