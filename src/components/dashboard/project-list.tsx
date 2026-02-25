
"use client";

import { useState } from "react";
import { useData } from "@/hooks/use-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "./project-card";
import { Project } from "@/lib/types";

export function ProjectList() {
  const { projects } = useData();
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "in-progress") return project.status === "On Track" || project.status === "Behind";
    return project.status.toLowerCase().replace(" ", "-") === filter;
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            An overview of all your active and completed projects.
          </CardDescription>
        </div>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filteredProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 py-12 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">No projects found</h3>
            <p className="text-sm text-muted-foreground">There are no projects matching the "{filter}" filter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
