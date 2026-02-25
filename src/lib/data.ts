import { User, Project, Task, Activity } from './types';
import { subDays, formatISO } from 'date-fns';

export const initialUsers: User[] = [
  { id: 'user-1', username: 'person1', name: 'Alex Grim', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/person1/40/40' },
  { id: 'user-2', username: 'person2', name: 'Ben Carter', role: 'Team Member', avatarUrl: 'https://picsum.photos/seed/person2/40/40' },
  { id: 'user-3', username: 'person3', name: 'Chloe Davis', role: 'Team Member', avatarUrl: 'https://picsum.photos/seed/person3/40/40' },
  { id: 'user-4', username: 'person4', name: 'Diana Evans', role: 'Viewer', avatarUrl: 'https://picsum.photos/seed/person4/40/40' },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'NexaTrack UI Overhaul',
    description: 'Redesign the entire user interface for a modern look and feel, improving user experience and accessibility.',
    startDate: formatISO(subDays(new Date(), 45)),
    endDate: formatISO(subDays(new Date(), -30)),
    status: 'On Track',
  },
  {
    id: 'proj-2',
    name: 'API Performance Optimization',
    description: 'Analyze and improve the performance of critical API endpoints to reduce latency and enhance scalability.',
    startDate: formatISO(subDays(new Date(), 60)),
    endDate: formatISO(subDays(new Date(), -15)),
    status: 'Behind',
  },
  {
    id: 'proj-3',
    name: 'Mobile App Launch',
    description: 'Develop and launch the new NexaTrack mobile application for iOS and Android platforms.',
    startDate: formatISO(subDays(new Date(), 90)),
    endDate: formatISO(subDays(new Date(), 5)),
    status: 'Completed',
  },
   {
    id: 'proj-4',
    name: 'Q3 Marketing Campaign',
    description: 'Plan and execute a comprehensive marketing campaign for the third quarter to boost user acquisition.',
    startDate: formatISO(subDays(new Date(), 20)),
    endDate: formatISO(subDays(new Date(), -40)),
    status: 'Pending',
  },
];

export const initialTasks: Task[] = [
  // Project 1 Tasks
  { id: 'task-1', projectId: 'proj-1', name: 'Moodboard Creation', description: 'Create moodboards and style scapes.', status: 'Completed', progress: 100, assigneeId: 'user-3' },
  { id: 'task-2', projectId: 'proj-1', name: 'Wireframing', description: 'Develop low-fidelity wireframes for all screens.', status: 'In-Progress', progress: 75, assigneeId: 'user-3' },
  { id: 'task-3', projectId: 'proj-1', name: 'High-Fidelity Mockups', description: 'Design detailed mockups in Figma.', status: 'In-Progress', progress: 40, assigneeId: 'user-1' },
  { id: 'task-4', projectId: 'proj-1', name: 'Component Library Setup', description: 'Set up the new component library in Storybook.', status: 'Pending', progress: 0, assigneeId: 'user-2' },

  // Project 2 Tasks
  { id: 'task-5', projectId: 'proj-2', name: 'Performance Bottleneck Analysis', description: 'Use profiling tools to identify slow endpoints.', status: 'Completed', progress: 100, assigneeId: 'user-2' },
  { id: 'task-6', projectId: 'proj-2', name: 'Database Query Optimization', description: 'Refactor inefficient SQL queries and add indexes.', status: 'Completed', progress: 100, assigneeId: 'user-2' },
  { id: 'task-7', projectId: 'proj-2', name: 'Implement Caching Layer', description: 'Add a Redis caching layer for frequently accessed data.', status: 'In-Progress', progress: 30, assigneeId: 'user-1' },
  { id: 'task-8', projectId: 'proj-2', name: 'Load Testing', description: 'Perform load testing with k6 to validate improvements.', status: 'Pending', progress: 0, assigneeId: 'user-4' },

  // Project 3 Tasks
  { id: 'task-9', projectId: 'proj-3', name: 'iOS Development', description: 'Complete feature development for the iOS app.', status: 'Completed', progress: 100, assigneeId: 'user-1' },
  { id: 'task-10', projectId: 'proj-3', name: 'Android Development', description: 'Complete feature development for the Android app.', status: 'Completed', progress: 100, assigneeId: 'user-2' },
  { id: 'task-11', projectId: 'proj-3', name: 'App Store Submission', description: 'Prepare and submit app bundles to App Store and Play Store.', status: 'Completed', progress: 100, assigneeId: 'user-1' },
];

export const initialActivities: Activity[] = [
    { id: 'act-1', userId: 'user-3', text: 'updated status of "Wireframing" to In-Progress.', timestamp: formatISO(subDays(new Date(), 1))},
    { id: 'act-2', userId: 'user-1', text: 'assigned "High-Fidelity Mockups" to Chloe Davis.', timestamp: formatISO(subDays(new Date(), 2))},
    { id: 'act-3', userId: 'user-2', text: 'completed task "Database Query Optimization".', timestamp: formatISO(subDays(new Date(), 2))},
    { id: 'act-4', userId: 'user-1', text: 'created a new project "Mobile App Launch".', timestamp: formatISO(subDays(new Date(), 4))},
];
