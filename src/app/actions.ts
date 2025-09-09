'use server';

import {
  selectAlgorithmAndParameters,
  type AlgorithmSelectionOutput,
} from '@/ai/flows/automated-algorithm-selection';

export async function getAlgorithmSuggestion(
  photoDataUri: string,
  taskDescription: string
): Promise<{ data: AlgorithmSelectionOutput | null; error: string | null }> {
  try {
    if (!photoDataUri) {
      return { data: null, error: 'Image data URI is required.' };
    }

    const result = await selectAlgorithmAndParameters({ photoDataUri, taskDescription });
    return { data: result, error: null };
  } catch (e: any) {
    console.error('Error calling AI flow:', e);
    return { data: null, error: e.message || 'An unexpected error occurred.' };
  }
}
