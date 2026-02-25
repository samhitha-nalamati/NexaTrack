
"use client";

import React, { createContext, useState } from "react";
import {
  initialProjects,
  initialTasks,
  initialUsers,
  initialActivities,
} from "@/lib/data";
import type { Project, Task, User, Activity, SubTaskSuggestion } from "@/lib/types";
import { formatISO } from "date-fns";

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  users: User[];
  activities: Activity[];
  getProjectTasks: (projectId: string) => Task[];
  getProjectProgress: (projectId: string) => number;
  getUserById: (userId: string) => User | undefined;
  addProject: (project: Omit<Project, 'id' | 'status'>, newTasks: SubTaskSuggestion[]) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'projectId' | 'progress'>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users] = useState<User[]>(initialUsers);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = (text: string, userId: string) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      text,
      timestamp: formatISO(new Date()),
      userId,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const getProjectTasks = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  }

  const getProjectProgress = (projectId: string) => {
    const projectTasks = getProjectTasks(projectId);
    if (projectTasks.length === 0) return 0;
    const totalProgress = projectTasks.reduce(
      (acc, task) => acc + task.progress,
      0
    );
    return Math.round(totalProgress / projectTasks.length);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'status'>, newTasks: SubTaskSuggestion[]) => {
    const newProjectId = `proj-${Date.now()}`;
    const newProject: Project = {
      id: newProjectId,
      ...projectData,
      status: 'Pending',
    };
    setProjects(prev => [newProject, ...prev]);

    const createdTasks: Task[] = newTasks.map((t, i) => ({
      id: `task-${Date.now()}-${i}`,
      projectId: newProjectId,
      name: t.name,
      description: t.description,
      status: 'Pending',
      progress: 0,
      assigneeId: users[0].id, // Default assignee
    }));

    setTasks(prev => [...prev, ...createdTasks]);
    addActivity(`created project "${newProject.name}"`, users[0].id);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, ...updates };
        if (updates.status && task.status !== updates.status) {
            addActivity(`updated status of "${updatedTask.name}" to ${updates.status}`, updatedTask.assigneeId);
        }
        if (updates.progress === 100 && task.progress !== 100) {
            updatedTask.status = 'Completed';
            addActivity(`completed task "${updatedTask.name}"`, updatedTask.assigneeId);
        }
        return updatedTask;
      }
      return task;
    }));
  };
  
  const addTask = (projectId: string, taskData: Omit<Task, 'id' | 'projectId' | 'progress'>) => {
    const newTask: Task = {
        id: `task-${Date.now()}`,
        projectId,
        progress: 0,
        ...taskData,
    };
    setTasks(prev => [newTask, ...prev]);
    addActivity(`added task "${newTask.name}" to a project`, newTask.assigneeId);
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        tasks,
        users,
        activities,
        getProjectTasks,
        getProjectProgress,
        getUserById,
        addProject,
        updateTask,
        addTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
