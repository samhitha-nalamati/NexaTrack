export type User = {
  id: string;
  username: string;
  name: string;
  role: 'Admin' | 'Team Member' | 'Viewer';
  avatarUrl: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
  progress: number;
  assigneeId: string;
  projectId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'On Track' | 'Behind' | 'Completed' | 'Pending';
};

export type Activity = {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
};

export type SubTaskSuggestion = {
  name: string;
  description: string;
}
