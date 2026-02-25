
"use client";

import { useData } from "@/hooks/use-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";

export function StatsCards() {
  const { projects, tasks, getProjectProgress } = useData();

  const totalProjects = projects.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressProjects = projects.filter(
    (p) => p.status === "On Track" || p.status === "Behind"
  ).length;

  const overallProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((acc, p) => acc + getProjectProgress(p.id), 0) /
            projects.length
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <p className="text-xs text-muted-foreground">
            {inProgressProjects} projects in progress
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            Across all projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallProgress}%</div>
          <p className="text-xs text-muted-foreground">
            Average completion of all projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tasks.filter((t) => t.status === "In-Progress").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Tasks currently in progress
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
