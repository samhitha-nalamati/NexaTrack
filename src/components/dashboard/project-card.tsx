
"use client";

import { useState } from "react";
import { useData } from "@/hooks/use-data";
import { Project } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, ListTodo, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TasksDialog } from "./tasks-dialog";
import { ProjectDialog } from "./project-dialog";

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  "On Track": "bg-green-500",
  Behind: "bg-red-500",
  Completed: "bg-blue-500",
  Pending: "bg-yellow-500",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { getProjectProgress, getProjectTasks, users } = useData();
  const [isTasksOpen, setTasksOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  
  const progress = getProjectProgress(project.id);
  const tasks = getProjectTasks(project.id);
  const uniqueAssigneeIds = [...new Set(tasks.map(t => t.assigneeId))];
  const assignees = uniqueAssigneeIds.map(id => users.find(u => u.id === id)).filter(Boolean);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="font-headline">{project.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTasksOpen(true)}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  View Tasks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEditOpen(true)} disabled>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" disabled>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge
            className={cn(
              "text-white",
              statusColors[project.status] || "bg-gray-400"
            )}
          >
            {project.status}
          </Badge>
          <div className="flex -space-x-2">
            {assignees.slice(0, 3).map(user => user && (
                <Avatar key={user.id} className="h-6 w-6 border-2 border-card">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            ))}
            {assignees.length > 3 && (
                <Avatar className="h-6 w-6 border-2 border-card">
                    <AvatarFallback>+{assignees.length - 3}</AvatarFallback>
                </Avatar>
            )}
          </div>
        </CardFooter>
      </Card>
      <TasksDialog open={isTasksOpen} onOpenChange={setTasksOpen} project={project} />
      {/* <ProjectDialog open={isEditOpen} onOpenChange={setEditOpen} project={project} /> */}
    </>
  );
}
