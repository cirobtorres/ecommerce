import {
  ArrowRight,
  Award,
  GraduationCap,
  Monitor,
  Presentation,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { contact, type CourseIcon, courses } from "@/lib/site-data";

const icons: Record<CourseIcon, typeof Award> = {
  monitor: Monitor,
  presentation: Presentation,
  award: Award,
  graduation: GraduationCap,
};

export function Courses() {
  return (
    <Section.Root id="cursos" tone="navy" className="overflow-hidden">
      <Section.Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <Image
            src="/images/courses.png"
            alt="Arquiteta estudando um curso online de modelagem 3D no notebook"
            width={900}
            height={700}
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
          <div className="absolute -bottom-5 right-4 rounded-lg bg-accent px-4 py-3 text-accent-foreground shadow-xl md:right-8">
            <p className="font-mono text-xs font-bold uppercase tracking-wider">
              Plataforma EAD oficial
            </p>
            <p className="text-sm">CAD, BIM, 3D e render com certificado</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              Treinamento e capacitação
            </p>
            <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
              Entregamos o software e ensinamos você a dominá-lo
            </h2>
            <p className="text-pretty leading-relaxed text-navy-foreground/75">
              Aprenda CAD, BIM, modelagem 3D e renderização no seu ritmo, do
              básico ao avançado, com instrutores que projetam no dia a dia.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => {
              const Icon = icons[course.icon];
              return (
                <Card.Root
                  key={course.id}
                  variant="navy"
                  padding="md"
                  className="border border-navy-foreground/10 bg-navy-foreground/5 transition-colors hover:border-primary"
                >
                  <Card.Icon className="bg-primary text-primary-foreground">
                    <Icon />
                  </Card.Icon>
                  <Card.Title className="text-base">{course.title}</Card.Title>
                  <Card.Description className="text-navy-foreground/70">
                    {course.description}
                  </Card.Description>
                </Card.Root>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver cursos e treinamentos
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar sobre treinamento
              </a>
            </Button>
          </div>
        </div>
      </Section.Container>
    </Section.Root>
  );
}
