import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    imageUrl: 'https://picsum.photos/seed/aws/200/200',
    aiHint: 'aws badge',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    imageUrl: 'https://picsum.photos/seed/azure/200/200',
    aiHint: 'azure badge',
  },
];

export function Certifications() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
      {certifications.map((cert) => (
        <Card key={cert.name} className="w-full max-w-xs text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <CardContent className="p-0">
            <Image
              src={cert.imageUrl}
              width={120}
              height={120}
              alt={`${cert.name} badge`}
              data-ai-hint={cert.aiHint}
              className="mx-auto mb-4 rounded-md"
            />
            <h3 className="font-headline text-lg font-semibold">{cert.name}</h3>
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
