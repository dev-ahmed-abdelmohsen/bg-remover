import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  backHref: string;
}

export function PageHeader({ title, description, backHref }: PageHeaderProps) {
  return (
    <header className="relative py-12 text-center animate-in fade-in duration-700">
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline" size="icon">
          <Link href={backHref}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
      </div>
      <h1 className="font-headline text-4xl md:text-5xl font-bold">{title}</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
