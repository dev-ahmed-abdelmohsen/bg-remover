import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  isComingSoon?: boolean;
}

export function ServiceCard({ icon: Icon, title, description, isComingSoon = false }: ServiceCardProps) {
  return (
    <Card className={cn(
      "text-center flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2",
      isComingSoon ? "bg-card/50 border-dashed" : "bg-card"
    )}>
      <CardHeader>
        {Icon && <Icon className={cn("w-10 h-10 mx-auto mb-4", isComingSoon ? "text-muted-foreground/50" : "text-accent")} />}
        <CardTitle className={cn("font-headline text-xl", isComingSoon && "text-muted-foreground")}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={cn("text-muted-foreground", isComingSoon && "text-muted-foreground/80")}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
