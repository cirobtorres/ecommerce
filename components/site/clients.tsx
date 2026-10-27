import { Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { clients, contact } from "@/lib/site-data";

export function Clients() {
  return (
    <Section.Root id="clientes">
      <Section.Container>
        <Section.Header>
          <Section.Eyebrow>Referências</Section.Eyebrow>
          <Section.Title>
            Empresas de vários setores projetam com as soluções que distribuímos
          </Section.Title>
        </Section.Header>

        <ul className="grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-4">
          {clients.map((client) => (
            <li
              key={client}
              className="flex h-24 items-center justify-center border-b border-r border-border px-4 text-center text-lg font-bold tracking-tight text-foreground/45 transition-colors hover:bg-surface hover:text-primary"
            >
              {client}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          Referências globais dos ecossistemas de software distribuídos pela
          TotalCad. As marcas pertencem aos seus respectivos titulares.
        </p>

        <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-navy p-6 text-navy-foreground md:flex-row md:items-center md:p-8">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Landmark className="size-6" aria-hidden="true" />
          </span>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Setor público e licitações
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-navy-foreground/75">
              Atendemos prefeituras, universidades, institutos federais e
              empresas públicas com software original, nota fiscal e apoio
              completo em licitações, pregões e dispensas.
            </p>
          </div>
          <Button
            asChild
            variant="accent"
            size="lg"
            className="w-full md:w-auto"
          >
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar sobre licitação
            </a>
          </Button>
        </div>
      </Section.Container>
    </Section.Root>
  );
}
