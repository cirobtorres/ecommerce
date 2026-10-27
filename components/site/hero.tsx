import { ArrowRight, Check, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { brands, contact } from "@/lib/site-data";

const checks = [
  "+755 mil clientes",
  "Softwares 100% originais",
  "Nota fiscal e suporte em português",
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-12 pt-12 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="normal-case tracking-normal">
            <span
              className="size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="font-semibold text-primary">20+ anos</span>{" "}
            distribuindo software no Brasil
          </Badge>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Os melhores softwares de{" "}
            <span className="text-primary">CAD, BIM, 3D e render</span> estão na{" "}
            <span className="relative whitespace-nowrap">
              TotalCad®
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-accent/70"
              />
            </span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Representante oficial de ZWCAD, SketchUp, V-Ray e outras marcas
            líderes. Teste sem custo, compre com nota fiscal e aprenda com
            nossos cursos e um suporte que fala a sua língua.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#softwares">
                Ver todos os softwares
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com um especialista
              </a>
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {checks.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy shadow-2xl shadow-navy/30 lg:rotate-1">
            <div className="flex items-center gap-2 border-b border-navy-foreground/10 px-4 py-2.5">
              <span
                className="size-2.5 rounded-full bg-navy-foreground/30"
                aria-hidden="true"
              />
              <span
                className="size-2.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span
                className="size-2.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="ml-2 font-mono text-xs text-navy-foreground/70">
                projeto-bim · ARCHLine.XP
              </span>
            </div>
            <Image
              src="/images/hero-bim.png"
              alt="Interface de software BIM exibindo o modelo 3D de uma casa moderna"
              width={1200}
              height={750}
              priority
              className="aspect-16/10 w-full object-cover"
            />
          </div>

          <div className="absolute -right-2 -top-5 flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-xl sm:-right-6">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-bold">100% original</p>
              <p className="text-xs text-muted-foreground">
                nota fiscal + suporte BR
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-lg bg-accent p-3 text-accent-foreground shadow-xl sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-md bg-navy text-navy-foreground">
              <Users className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-sm font-bold">+755 mil</p>
              <p className="text-xs">clientes atendidos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
        <div className="border-t border-border pt-8">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Marcas distribuídas oficialmente
          </p>
          <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul
              className="flex w-max animate-marquee gap-14"
              aria-label="Marcas parceiras"
            >
              {[...brands, ...brands].map((brand, index) => (
                <li
                  key={`${brand.id}-${index < brands.length ? "a" : "b"}`}
                  aria-hidden={index >= brands.length}
                  className="whitespace-nowrap text-2xl font-bold tracking-tight text-foreground/40"
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
