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
          description="Instantly remove the background from any image with incredible precision using the @imgly/background-removal library."
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
                This tool uses the `@imgly/background-removal` library to process images directly in your browser. When you upload an image, it's not sent to a server. Instead, the library's powerful AI model runs locally to identify and remove the background, ensuring both speed and privacy.
            </p>
            <p>
                Once the processing is complete, you get a high-quality image with a transparent background, ready to be downloaded and used in your projects.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
