
"use client";

import { useData } from "@/hooks/use-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export function ActivityFeed() {
  const { activities, getUserById } = useData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Updates from your team members.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const user = getUserById(activity.userId);
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">{user?.name}</span>{" "}
                  {activity.text}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
