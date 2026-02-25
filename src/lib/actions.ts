
"use server";

import { suggestSubTasks, AITaskBreakdownSuggestionInput } from "@/ai/flows/ai-task-breakdown-suggestion";

export async function getAISubtaskSuggestions(
  input: AITaskBreakdownSuggestionInput
) {
  try {
    const suggestions = await suggestSubTasks(input);
    return { success: true, data: suggestions };
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return { success: false, error: "Failed to generate AI suggestions." };
  }
}
