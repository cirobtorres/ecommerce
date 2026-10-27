import { Building2, Factory, GraduationCap, HardHat } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { type SegmentIcon, segments } from "@/lib/site-data";

const icons: Record<SegmentIcon, typeof Factory> = {
  building: Building2,
  hardhat: HardHat,
  factory: Factory,
  graduation: GraduationCap,
};

export function Segments() {
  return (
    <Section.Root tone="muted">
      <Section.Container>
        <Section.Header>
          <Section.Eyebrow>Para quem atendemos</Section.Eyebrow>
          <Section.Title>
            A solução ideal para cada perfil de profissional e empresa
          </Section.Title>
          <Section.Description>
            Do escritório ao chão de fábrica, ajudamos você a escolher e
            licenciar o software certo.
          </Section.Description>
        </Section.Header>

        <div className="grid gap-5 md:grid-cols-2">
          {segments.map((segment) => {
            const Icon = icons[segment.icon];
            return (
              <Card.Root
                key={segment.id}
                variant="interactive"
                padding="lg"
                className="sm:flex-row sm:items-start"
              >
                <Card.Icon className="size-14 [&_svg]:size-6">
                  <Icon />
                </Card.Icon>
                <Card.Content className="flex-1">
                  <Card.Title className="text-xl">{segment.title}</Card.Title>
                  <Card.Description>{segment.description}</Card.Description>
                  <p className="border-t border-border pt-3 text-xs">
                    <span className="font-mono uppercase tracking-wider text-muted-foreground">
                      {segment.label}:{" "}
                    </span>
                    <span className="font-semibold text-primary">
                      {segment.products}
                    </span>
                  </p>
                </Card.Content>
              </Card.Root>
            );
          })}
        </div>
      </Section.Container>
    </Section.Root>
  );
}
