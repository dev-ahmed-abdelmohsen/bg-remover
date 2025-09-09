'use server';

/**
 * @fileOverview Implements the background removal functionality.
 *
 * - removeBackground - A function that removes the background from an image.
 * - BackgroundRemovalInput - The input type for the removeBackground function.
 * - BackgroundRemovalOutput - The return type for the removeBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundRemovalInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo from which the background needs to be removed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type BackgroundRemovalInput = z.infer<typeof BackgroundRemovalInputSchema>;

const BackgroundRemovalOutputSchema = z.object({
  imageWithBackgroundRemoved: z
    .string()
    .describe(
      "The image with the background removed, as a data URI that must include a MIME type and use Base64 encoding. The background should be transparent."
    ),
});
export type BackgroundRemovalOutput = z.infer<typeof BackgroundRemovalOutputSchema>;

export async function removeBackground(
  input: BackgroundRemovalInput
): Promise<BackgroundRemovalOutput> {
  return backgroundRemovalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'backgroundRemovalPrompt',
  input: {schema: BackgroundRemovalInputSchema},
  output: {schema: BackgroundRemovalOutputSchema},
  prompt: `You are an expert in image processing. Your task is to remove the background from the provided image, leaving only the main subject. The resulting image must have a transparent background.

Image: {{media url=photoDataUri}}

Output an image data URI with a transparent background.
`,
});

const backgroundRemovalFlow = ai.defineFlow(
  {
    name: 'backgroundRemovalFlow',
    inputSchema: BackgroundRemovalInputSchema,
    outputSchema: BackgroundRemovalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
