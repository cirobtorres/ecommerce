import { CreditCard, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact, paymentMethods } from "@/lib/site-data";

export function ContactCta() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-2xl font-bold md:text-3xl">
            Pagamento com condições facilitadas
          </h2>
          <p className="text-muted-foreground">
            Escolha a opção que combina com o seu fluxo de caixa.
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <li
                key={method.id}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
              >
                <CreditCard
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
                {method.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 opacity-40 mix-blend-overlay"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Fale com a gente
            </p>
            <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
              Ainda em dúvida sobre qual software é o ideal para o seu projeto?
            </h2>
            <p className="text-pretty leading-relaxed text-primary-foreground/85">
              Converse com um especialista da TotalCad e receba uma recomendação
              sob medida, sem compromisso.
            </p>
            <Button asChild size="lg" variant="accent">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
