import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Link as LinkIcon, Wand2 } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {/* Header Section */}
        <header className="relative w-full py-20 lg:py-32 text-center text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-900 to-accent opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
          <div className="relative container mx-auto px-4 animate-in fade-in duration-1000">
            <Image
              src="https://picsum.photos/200/200"
              width={160}
              height={160}
              alt="Ahmed Abd Elmohsen"
              data-ai-hint="professional portrait"
              className="rounded-full mx-auto mb-6 border-4 border-background/20 shadow-lg"
            />
            <h1 className="font-headline text-4xl md:text-6xl font-bold">Ahmed Abd Elmohsen</h1>
            <p className="mt-2 text-lg md:text-2xl text-accent-foreground/80">
              DevOps Engineer | Cloud Enthusiast
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <section id="about" className="py-20 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DevOps Engineer with expertise in cloud infrastructure, CI/CD pipelines, and automation. Passionate about creating efficient development workflows and implementing cutting-edge technologies to streamline operations.
            </p>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 text-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">What I Can Do For You</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
              I'm building a suite of intelligent tools to automate and enhance your creative workflows. Here's a preview of what's coming soon.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/services/background-removal" className="flex h-full">
                <ServiceCard
                  icon={Wand2}
                  title="AI Background Removal"
                  description="Instantly remove the background from any image with incredible precision. Perfect for product photos, portraits, and more."
                />
              </Link>
              <ServiceCard
                title="Coming Soon"
                description="More exciting services are in development. Stay tuned for updates!"
                isComingSoon
              />
               <ServiceCard
                title="Coming Soon"
                description="More exciting services are in development. Stay tuned for updates!"
                isComingSoon
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-primary text-primary-foreground mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <LinkIcon size={24} />
              <span className="sr-only">Portfolio</span>
            </a>
          </div>
          <div className="flex justify-center items-center space-x-2 my-4 text-sm">
            <span>Deployed on</span>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-semibold flex items-center gap-1">
              <svg height="15" viewBox="0 0 75 65" fill="currentColor" aria-label="Vercel logomark">
                <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
              </svg>
              Vercel
            </a>
          </div>
          <p className="text-sm text-primary-foreground/60">&copy; {new Date().getFullYear()} Ahmed Abd Elmohsen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
