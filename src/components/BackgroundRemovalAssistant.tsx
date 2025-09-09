'use client';

import { useState } from 'react';
import { getAlgorithmSuggestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import type { AlgorithmSelectionOutput } from '@/ai/flows/automated-algorithm-selection';

const SAMPLE_IMAGE_DATA_URI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAgACADAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAwIBBwQA/8QAIxABAQEAAgICAgIDAAAAAAAAAAECAxESBCExBUFRYSITMv/EABcBAQEBAQAAAAAAAAAAAAAAAAECAwD/xAAaEQEBAQEBAQEAAAAAAAAAAAAAARIBEQMh/9oADAMBAAIRAxEBAxEB/AAAqBgCgAAAAAAAAACgYAAKAaBFAaACoGAKAAAKBigAAAAAoGAKAAAAAAAACgYAAAAAAAAoGAKAAAKAaBigADQAAAKBgAAAAAA//a";


export function BackgroundRemovalAssistant() {
  const [photoDataUri, setPhotoDataUri] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AlgorithmSelectionOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { data, error } = await getAlgorithmSuggestion(photoDataUri, taskDescription);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else if (data) {
      setResult(data);
    }
    setLoading(false);
  };
  
  const useSampleImage = () => {
    setPhotoDataUri(SAMPLE_IMAGE_DATA_URI);
    setTaskDescription("A photo of a white cat on a floral background. Please remove the background.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-headline">Get a Suggestion</CardTitle>
            <CardDescription>
              Provide an image data URI and an optional description.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-uri">Photo Data URI</Label>
              <Textarea
                id="photo-uri"
                placeholder="data:image/png;base64,..."
                value={photoDataUri}
                onChange={(e) => setPhotoDataUri(e.target.value)}
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Task Description (Optional)</Label>
              <Input
                id="description"
                placeholder="e.g., Remove background from product photo"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={useSampleImage}>
              Use Sample
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              {loading ? 'Analyzing...' : 'Suggest Algorithm'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="h-full">
        {loading && (
           <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
            <Loader2 className="w-12 h-12 text-muted-foreground animate-spin"/>
            <p className="mt-4 text-muted-foreground">AI is thinking...</p>
           </Card>
        )}
        {result && (
          <Card className="bg-gradient-to-br from-secondary/50 to-background h-full animate-in fade-in duration-500">
             <CardHeader>
                <CardTitle className="font-headline text-accent flex items-center gap-2">
                    <Wand2 />
                    AI Recommendation
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Algorithm</Label>
                    <p className="text-lg font-semibold">{result.algorithm}</p>
                </div>
                 <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Parameters</Label>
                    <pre className="mt-1 p-3 bg-primary/5 rounded-md text-sm text-foreground/80 overflow-x-auto">
                        <code>{JSON.stringify(result.parameters, null, 2)}</code>
                    </pre>
                </div>
                <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Reasoning</Label>
                    <p className="mt-1 text-muted-foreground italic">"{result.reasoning}"</p>
                </div>
             </CardContent>
          </Card>
        )}
         {!loading && !result && (
             <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
                <Wand2 className="w-12 h-12 text-muted-foreground/50"/>
                <p className="mt-4 text-muted-foreground">Your result will appear here</p>
            </Card>
        )}
      </div>
    </div>
  );
}
