'use client';

import { useState, useRef } from 'react';
import { removeImageBackground } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2, UploadCloud, Wand2, X } from 'lucide-react';
import Image from 'next/image';

export function BackgroundRemovalAssistant() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setOriginalImage(loadEvent.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload an image first.',
      });
      return;
    }

    setLoading(true);
    setProcessedImage(null);

    const { data, error } = await removeImageBackground(originalImage);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else if (data) {
      setProcessedImage(data.imageWithBackgroundRemoved);
    }
    setLoading(false);
  };

  const clearImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload your Image</CardTitle>
          <CardDescription>
            Select an image file to remove its background.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {originalImage ? (
            <div className="relative group">
                <Image
                    src={originalImage}
                    alt="Original image"
                    width={500}
                    height={300}
                    className="rounded-md object-contain w-full h-auto"
                />
                 <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={clearImages}
                >
                    <X size={18}/>
                    <span className="sr-only">Clear image</span>
                </Button>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-12 h-12 text-muted-foreground"/>
              <p className="mt-4 text-muted-foreground">Click to upload an image</p>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleRemoveBackground} disabled={loading || !originalImage}>
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            {loading ? 'Processing...' : 'Remove Background'}
          </Button>
        </CardFooter>
      </Card>

      <div className="h-full">
        {loading && (
          <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
            <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
            <p className="mt-4 text-muted-foreground">AI is thinking...</p>
          </Card>
        )}
        {processedImage && (
          <Card className="bg-gradient-to-br from-secondary/50 to-background h-full animate-in fade-in duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-accent flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Wand2 />
                    Result
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download size={16}/>
                    Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Image
                    src={processedImage}
                    alt="Processed image with background removed"
                    width={500}
                    height={300}
                    className="rounded-md object-contain"
                />
            </CardContent>
          </Card>
        )}
        {!loading && !processedImage && (
          <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
            <Wand2 className="w-12 h-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Your result will appear here</p>
          </Card>
        )}
      </div>
    </div>
  );
}
