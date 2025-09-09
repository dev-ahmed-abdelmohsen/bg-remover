"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Server, Code, Database, Container, GitBranch, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const skillCategories: { title: string; icon: LucideIcon; skills: string[] }[] = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: ["AWS", "Azure", "GCP"],
  },
  {
    title: "CI/CD",
    icon: GitBranch,
    skills: ["Jenkins", "GitHub Actions", "GitLab CI"],
  },
  {
    title: "Containerization",
    icon: Container,
    skills: ["Docker", "Kubernetes"],
  },
  {
    title: "Infrastructure as Code",
    icon: Server,
    skills: ["Terraform", "Ansible"],
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "JavaScript", "Node.js"],
  },
  {
    title: "Monitoring",
    icon: Monitor,
    skills: ["Prometheus", "Grafana", "ELK Stack"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
];

export function Skills() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category) => (
        <Card key={category.title} className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <category.icon className="w-8 h-8 text-accent" />
            <CardTitle className="font-headline text-lg">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-sm">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
