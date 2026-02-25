'use server';
/**
 * @fileOverview This file implements a Genkit flow that uses AI to suggest detailed sub-tasks and descriptions
 * based on a high-level project goal. It's designed to help Admins quickly define and assign project tasks.
 *
 * - suggestSubTasks - The main function to call for generating sub-task suggestions.
 * - AITaskBreakdownSuggestionInput - The input type for the suggestSubTasks function.
 * - AITaskBreakdownSuggestionOutput - The return type for the suggestSubTasks function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AITaskBreakdownSuggestionInputSchema = z.object({
  projectGoal: z.string().describe('A high-level project goal for which sub-tasks need to be generated.'),
});
export type AITaskBreakdownSuggestionInput = z.infer<typeof AITaskBreakdownSuggestionInputSchema>;

const AITaskBreakdownSuggestionOutputSchema = z.array(
  z.object({
    name: z.string().describe('A concise name for the suggested sub-task.'),
    description: z.string().describe('A detailed explanation of what needs to be done for this sub-task.'),
  })
).describe('A list of detailed sub-tasks with names and descriptions.');
export type AITaskBreakdownSuggestionOutput = z.infer<typeof AITaskBreakdownSuggestionOutputSchema>;

export async function suggestSubTasks(
  input: AITaskBreakdownSuggestionInput
): Promise<AITaskBreakdownSuggestionOutput> {
  return aiTaskBreakdownSuggestionFlow(input);
}

const aiTaskBreakdownSuggestionPrompt = ai.definePrompt({
  name: 'aiTaskBreakdownSuggestionPrompt',
  input: { schema: AITaskBreakdownSuggestionInputSchema },
  output: { schema: AITaskBreakdownSuggestionOutputSchema },
  prompt: `You are an expert project manager. Your task is to break down a high-level project goal into a list of detailed, actionable sub-tasks, each with a comprehensive description.

The project goal is: "{{{projectGoal}}}"

Please provide the output as a JSON array of objects. Each object should have two fields:
- "name": A concise name for the sub-task.
- "description": A detailed explanation of what needs to be done for this sub-task, including any necessary steps or considerations.

Example Output:
[
  {
    "name": "Conduct market research",
    "description": "Analyze target audience, competitor strategies, and current industry trends to gather data for product development."
  },
  {
    "name": "Develop project timeline",
    "description": "Create a detailed schedule with milestones, task dependencies, and resource allocation for the entire project lifecycle."
  }
]`,
});

const aiTaskBreakdownSuggestionFlow = ai.defineFlow(
  {
    name: 'aiTaskBreakdownSuggestionFlow',
    inputSchema: AITaskBreakdownSuggestionInputSchema,
    outputSchema: AITaskBreakdownSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await aiTaskBreakdownSuggestionPrompt(input);
    return output!;
  }
);
