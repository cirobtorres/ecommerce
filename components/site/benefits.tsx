import {
  BadgeCheck,
  CreditCard,
  GraduationCap,
  Headset,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { type BenefitIcon, benefits } from "@/lib/site-data";

const icons: Record<BenefitIcon, typeof Users> = {
  badge: BadgeCheck,
  users: Users,
  card: CreditCard,
  graduation: GraduationCap,
  headset: Headset,
  shield: ShieldCheck,
};

export function Benefits() {
  return (
    <Section.Root tone="muted">
      <Section.Container>
        <Section.Header align="start">
          <Section.Eyebrow>Por que a TotalCad</Section.Eyebrow>
          <Section.Title>
            Mais que uma loja de software: um parceiro do seu trabalho
          </Section.Title>
          <Section.Description>
            Do orçamento ao suporte, você conta com uma distribuidora oficial
            que entende de projeto.
          </Section.Description>
        </Section.Header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = icons[benefit.icon];
            return (
              <Card.Root key={benefit.id} variant="interactive" padding="lg">
                <Card.Icon>
                  <Icon />
                </Card.Icon>
                <Card.Title>{benefit.title}</Card.Title>
                <Card.Description>{benefit.description}</Card.Description>
              </Card.Root>
            );
          })}
        </div>
      </Section.Container>
    </Section.Root>
  );
}
