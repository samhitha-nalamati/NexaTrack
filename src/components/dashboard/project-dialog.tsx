
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useData } from "@/hooks/use-data";
import { getAISubtaskSuggestions } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Plus, Trash2 } from "lucide-react";
import type { SubTaskSuggestion } from "@/lib/types";

const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters."),
  description: z.string().min(10, "Description is too short."),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end date",
  }),
  aiGoal: z.string().optional(),
  tasks: z.array(z.object({
    name: z.string().min(1, "Task name cannot be empty."),
    description: z.string().min(1, "Task description cannot be empty."),
  })).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ open, onOpenChange }: ProjectDialogProps) {
  const { addProject } = useData();
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .split("T")[0],
      aiGoal: "",
      tasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const handleGenerateTasks = async () => {
    const goal = form.getValues("aiGoal");
    if (!goal) {
      form.setError("aiGoal", { message: "Please enter a goal to generate tasks." });
      return;
    }
    setIsAiLoading(true);
    const result = await getAISubtaskSuggestions({ projectGoal: goal });
    setIsAiLoading(false);
    if (result.success && result.data) {
      form.setValue("tasks", result.data);
      toast({ title: "AI suggestions loaded", description: `${result.data.length} tasks have been generated for you.` });
    } else {
      toast({ variant: "destructive", title: "AI Error", description: result.error });
    }
  };

  function onSubmit(data: ProjectFormValues) {
    const { aiGoal, tasks, ...projectData } = data;
    addProject(projectData, tasks || []);
    toast({ title: "Project Created", description: `"${data.name}" has been successfully created.` });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[60vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below. You can also use AI to generate sub-tasks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow flex flex-col gap-4 overflow-hidden">
            <ScrollArea className="flex-grow pr-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 rounded-lg border bg-background p-4">
                  <h3 className="font-semibold text-base">AI Task Breakdown</h3>
                  <FormField
                    control={form.control}
                    name="aiGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>High-Level Project Goal</FormLabel>
                        <FormControl><Textarea placeholder="e.g., Launch a new marketing website for a SaaS product" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" size="sm" onClick={handleGenerateTasks} disabled={isAiLoading}>
                    {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Tasks with AI
                  </Button>
                </div>
                {fields.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base">Suggested Tasks</h3>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start rounded-md border p-3">
                        <div className="flex-grow space-y-2">
                           <FormField
                            control={form.control}
                            name={`tasks.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                           <FormField
                            control={form.control}
                            name={`tasks.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Textarea {...field} rows={2} /></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
