'use server';

/**
 * @fileOverview Implements the automated algorithm selection for background removal.
 *
 * - selectAlgorithmAndParameters - A function that selects the best background removal algorithm and parameters.
 * - AlgorithmSelectionInput - The input type for the selectAlgorithmAndParameters function.
 * - AlgorithmSelectionOutput - The return type for the selectAlgorithmAndParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlgorithmSelectionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo for which the background needs to be removed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  taskDescription: z
    .string()
    .optional()
    .describe('Optional description of the removal task.'),
});
export type AlgorithmSelectionInput = z.infer<typeof AlgorithmSelectionInputSchema>;

const AlgorithmSelectionOutputSchema = z.object({
  algorithm: z.string().describe('The selected background removal algorithm.'),
  parameters: z.record(z.any()).describe('The parameters for the selected algorithm.'),
  reasoning: z.string().describe('The reasoning behind the algorithm and parameter selection.'),
});
export type AlgorithmSelectionOutput = z.infer<typeof AlgorithmSelectionOutputSchema>;

export async function selectAlgorithmAndParameters(
  input: AlgorithmSelectionInput
): Promise<AlgorithmSelectionOutput> {
  return automatedAlgorithmSelectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'algorithmSelectionPrompt',
  input: {schema: AlgorithmSelectionInputSchema},
  output: {schema: AlgorithmSelectionOutputSchema},
  prompt: `You are an expert in background removal algorithms. Given an image and an optional task description, you will select the best algorithm and parameters for removing the background.

Image: {{media url=photoDataUri}}
Task Description: {{{taskDescription}}}

Consider various factors such as image complexity, subject details, and desired output quality. Provide a JSON object with the selected algorithm, parameters, and a brief explanation of your choices.

Ensure that the parameters are compatible with the selected algorithm.

Output:
{
  "algorithm": "<algorithm_name>",
  "parameters": {<parameter_name>: <parameter_value>, ...},
  "reasoning": "<reasoning_for_selection>"
}
`,
});

const automatedAlgorithmSelectionFlow = ai.defineFlow(
  {
    name: 'automatedAlgorithmSelectionFlow',
    inputSchema: AlgorithmSelectionInputSchema,
    outputSchema: AlgorithmSelectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
