import { BackgroundRemovalAssistant } from '@/components/BackgroundRemovalAssistant';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function BackgroundRemovalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="AI Background Removal"
          description="An intelligent tool that automatically selects the best algorithm to remove image backgrounds with high precision."
          backHref="/"
        />

        <section className="my-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Try It Yourself
          </h2>
          <BackgroundRemovalAssistant />
        </section>

        <section className="my-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
           <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
             <p>
                The AI Background Removal tool is not just a single algorithm, but an intelligent system that analyzes your image and selects the most suitable technique from a variety of specialized algorithms. This approach ensures optimal results for a wide range of images, from simple portraits to complex scenes with fine details.
            </p>
            <p>
                The core of this service is a Genkit AI flow that takes an image and an optional text prompt as input. It uses a powerful generative model to evaluate the image's characteristics and determine the best strategy for background removal, including the right parameters to use.
            </p>
          </div>
        </section>

        <section className="my-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
           <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            System Architecture
          </h2>
           <Card className="max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                    <Image
                        src="https://picsum.photos/1200/600"
                        width={1200}
                        height={600}
                        alt="System Architecture Diagram"
                        data-ai-hint="system architecture"
                        className="w-full"
                    />
                </CardContent>
            </Card>
            <p className="text-center mt-4 text-muted-foreground text-sm">A high-level overview of the service's architecture.</p>
        </section>
      </main>
    </div>
  );
}
