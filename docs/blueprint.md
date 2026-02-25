# **App Name**: NexaTrack Dashboard

## Core Features:

- Secure User Authentication & Role Management: Enable secure registration, login, and authorization mechanisms, granting all authenticated users full access to all features. Includes predefined users for testing: person1 (Admin), person2 (Team Member), person3 (Team Member), person4 (Viewer), all with password '12345678'.
- Admin Project Management: Provide administrators with the capability to create, view, edit, and delete projects, including details like name, description, start/end dates, and overall status.
- Task Assignment and Progress Updates: Allow administrators to define and assign tasks to team members. Team members can then update the status (Pending, In-Progress, Completed) and progress percentage for their assigned tasks.
- AI-Powered Sub-Task Suggestions: Integrate an AI tool (via Gemini/Genkit) to suggest detailed sub-tasks and descriptions based on a high-level project goal provided by the user.
- Dynamic Project Overview Dashboard: Display a centralized dashboard showcasing projects with their completion percentages, color-coded status indicators (e.g., Red=Behind, Yellow=In Progress, Green=On Track), and basic filtering options by status.
- Real-time Activity Feed: Implement an activity feed that updates automatically to show real-time changes in tasks and projects by any user, including subtle notifications for updates.
- Role-Adaptive User Experience: Dynamically adjust UI elements and available actions based on the authenticated user's role (Admin, Team Member, Viewer) to provide a tailored and secure user experience.

## Style Guidelines:

- Primary brand color: A deep, professional blue (#2E5CB8) for headings, active elements, and branding, evoking clarity and stability.
- Background color: A very light, subtle blue-grey (#F0F2F4) to provide a clean and calming canvas, enhancing content readability.
- Accent color: A vibrant cyan-blue (#30C9E8) for calls to action, highlights, and interactive elements, providing a refreshing contrast to the primary blue.
- Status indicators: Utilize clear and intuitive color-coding, such as Red for 'Behind', Yellow for 'In Progress', and Green for 'On Track', for immediate visual cues.
- Headlines font: 'Space Grotesk' (sans-serif) for a modern, techy, and impactful visual presence. Note: currently only Google Fonts are supported.
- Body text font: 'Inter' (sans-serif) for clean readability, especially suitable for data-heavy sections and sustained reading. Note: currently only Google Fonts are supported.
- Employ consistent line-art or filled vector icons across the application for projects, tasks, user roles, and interactive controls to maintain visual harmony and clarity.
- Implement a modular layout featuring a fixed sidebar navigation, resizable main content areas, and clearly distinct card-based displays for projects and tasks, ensuring full responsiveness across all device sizes.
- Integrate subtle and smooth animations for content loading, dynamic progress bar fills, and real-time update notifications to enhance user feedback and engagement.