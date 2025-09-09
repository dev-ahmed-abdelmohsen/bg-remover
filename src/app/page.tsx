import Image from 'next/image';
import { Github, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Skills } from '@/components/Skills';
import { ProjectCard } from '@/components/ProjectCard';
import { CountdownTimer } from '@/components/CountdownTimer';
import { Certifications } from '@/components/Certifications';
import { BackgroundRemovalAssistant } from '@/components/BackgroundRemovalAssistant';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-commerce API',
    description: 'A robust and scalable RESTful API for an e-commerce platform, built with performance and security in mind.',
    tags: ['Node.js', 'MongoDB', 'Docker', 'Express'],
  },
  {
    title: 'Task Management Dashboard',
    description: 'A full-stack application to help teams organize, track, and manage tasks and projects effectively.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    title: 'Real-time Chat Application',
    description: 'A web-based chat application enabling instant messaging and communication between users.',
    tags: ['React', 'Node.js', 'Socket.io', 'Express'],
  },
];

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

          {/* Skills Section */}
          <section id="skills" className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">My Skills</h2>
            <Skills />
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Certifications</h2>
            <Certifications />
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Key Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </section>

          {/* Countdown Section */}
          <section id="wip" className="py-20 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Work in Progress</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Currently working on an automated background removal tool with Next.js and Azure DevOps.
            </p>
            <CountdownTimer />
          </section>
          
          {/* AI Assistant Section */}
          <section id="ai-tool" className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
             <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">Background Removal Assistant</h2>
             <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              Test the AI model that selects the best algorithm for removing an image's background. Provide an image as a data URI to get a suggestion.
            </p>
            <BackgroundRemovalAssistant />
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
