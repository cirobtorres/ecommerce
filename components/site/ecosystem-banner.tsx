import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function EcosystemBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <Image
        src="/images/ecosystem-house.png"
        alt="Render fotorrealista de uma casa moderna ao anoitecer"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/80 to-transparent"
      />

      <div className="mx-auto flex min-h-112 max-w-7xl flex-col justify-center gap-5 px-4 py-20 sm:px-6 md:min-h-136">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Ecossistema completo
        </p>
        <h2 className="max-w-xl text-balance text-3xl font-bold leading-tight md:text-5xl">
          Tudo o que você precisa para tirar o projeto do papel
        </h2>
        <p className="max-w-lg text-pretty leading-relaxed text-navy-foreground/80">
          Desenhe, modele, documente e apresente com as mesmas ferramentas
          profissionais usadas por escritórios e construtoras ao redor do mundo.
        </p>
        <Button asChild size="lg" variant="accent" className="w-fit">
          <a href="#softwares">
            Explorar softwares
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}
