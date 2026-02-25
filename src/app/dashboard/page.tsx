import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <StatsCards />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProjectList />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
