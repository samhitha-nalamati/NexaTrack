
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectDialog } from "./project-dialog";
import { useState } from "react";

export function Header() {
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="w-full flex-1">
          <h1 className="font-headline text-lg font-semibold md:text-2xl">
            Dashboard
          </h1>
        </div>
        <Button size="sm" onClick={() => setProjectDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </header>
      <ProjectDialog open={isProjectDialogOpen} onOpenChange={setProjectDialogOpen} />
    </>
  );
}
