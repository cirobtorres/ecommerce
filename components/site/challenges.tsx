import { ArrowRight, Box, Factory, PenTool, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { type ChallengeIcon, challenges } from "@/lib/site-data";
import { StatsBar } from "./stats-bar";

const icons: Record<ChallengeIcon, typeof Box> = {
  pen: PenTool,
  box: Box,
  sparkles: Sparkles,
  factory: Factory,
};

export function Challenges() {
  return (
    <Section.Root id="solucoes">
      <Section.Container>
        <StatsBar className="mb-16 shadow-xl shadow-primary/20 md:mb-24" />

        <Section.Header align="start">
          <Section.Eyebrow>Soluções por necessidade</Section.Eyebrow>
          <Section.Title>Qual desafio o seu projeto enfrenta?</Section.Title>
          <Section.Description>
            Do primeiro traço ao render final, existe um software certo para
            cada fase do seu trabalho.
          </Section.Description>
        </Section.Header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Card.Root key={item.id} variant="interactive" padding="lg">
                <Card.Icon>
                  <Icon />
                </Card.Icon>
                <Card.Header>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Header>
                <ul
                  className="flex flex-wrap gap-1.5"
                  aria-label="Softwares indicados"
                >
                  {item.products.map((product) => (
                    <li
                      key={product}
                      className="rounded bg-surface px-2 py-1 font-mono text-xs font-medium"
                    >
                      {product}
                    </li>
                  ))}
                </ul>
                <Card.Footer className="pt-2">
                  <a
                    href="#softwares"
                    className="flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0"
                  >
                    Conhecer
                    <ArrowRight
                      className="size-4 transition-transform group-hover/card:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </Card.Footer>
              </Card.Root>
            );
          })}
        </div>
      </Section.Container>
    </Section.Root>
  );
}
