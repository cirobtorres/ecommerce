import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/ui/section";
import { aboutHighlights, partners, stats } from "@/lib/site-data";

export function About() {
  return (
    <Section.Root id="sobre">
      <Section.Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Section.Header align="start" className="mb-0">
            <Section.Eyebrow>Quem é a TotalCad</Section.Eyebrow>
            <Section.Title>
              Duas décadas aproximando quem projeta das melhores ferramentas
            </Section.Title>
          </Section.Header>

          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Somos uma distribuidora oficial de softwares de CAD, BIM, 3D e
              renderização no Brasil. Desde o início, ajudamos arquitetos,
              engenheiros, projetistas e construtoras a escolher, licenciar e
              dominar as ferramentas ideais.
            </p>
            <p>
              Trabalhamos em parceria direta com fabricantes como{" "}
              <strong className="font-semibold text-foreground">
                ZWSOFT, Trimble, Chaos e CADLine
              </strong>
              . Cada venda é original, com nota fiscal e{" "}
              <strong className="font-semibold text-foreground">
                suporte humano em português
              </strong>
              , inclusive para órgãos públicos e processos de licitação.
            </p>
            <p>
              Além das licenças, oferecemos cursos EAD próprios, treinamentos
              presenciais e consultoria na escolha do software — acompanhando
              você do primeiro esboço à entrega final.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {aboutHighlights.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-2 text-sm font-medium"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-6 self-start rounded-2xl bg-navy p-6 text-navy-foreground md:p-8">
          <dl className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-1 border-l-2 border-accent pl-4"
              >
                <dt className="order-2 text-xs leading-relaxed text-navy-foreground/70">
                  {stat.label}
                </dt>
                <dd className="order-1 font-mono text-2xl font-bold md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-navy-foreground/15 pt-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-navy-foreground/60">
              Parcerias oficiais
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {partners.map((partner) => (
                <li key={partner} className="text-lg font-bold tracking-tight">
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Section.Container>
    </Section.Root>
  );
}
