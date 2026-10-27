import { ArrowUpRight, Puzzle } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { contact, plugins, type Product, products } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const layoutClasses: Record<Product["layout"], string> = {
  feature: "sm:col-span-2 lg:row-span-2 min-h-96 lg:min-h-0",
  wide: "sm:col-span-2 min-h-64",
  tall: "lg:row-span-2 min-h-64",
  small: "min-h-64",
};

function ProductTile({ product }: { product: Product }) {
  const isLarge = product.layout === "feature";
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-xl bg-navy text-navy-foreground",
        layoutClasses[product.layout],
      )}
    >
      <Image
        src={product.image || "/placeholder.svg"}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy via-navy/80 to-navy/10"
      />

      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Badge variant="accent" size="sm">
          {product.category}
        </Badge>
        <Badge variant="glass" size="sm">
          {product.maker}
        </Badge>
      </div>

      <div
        className={cn("relative flex flex-col gap-2 p-5", isLarge && "md:p-8")}
      >
        <p className="font-mono text-sm font-semibold text-accent">
          {product.name}
        </p>
        <h3
          className={cn(
            "text-pretty font-semibold leading-snug",
            isLarge ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {product.title}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-navy-foreground/75">
          {product.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button asChild size="sm" variant="primary">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Avaliar grátis
            </a>
          </Button>
          <Button asChild size="sm" variant="outline-light">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Comprar ${product.name}`}
            >
              Comprar
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <Section.Root id="softwares" tone="muted">
      <Section.Container>
        <Section.Header>
          <Section.Eyebrow>Portfólio TotalCad</Section.Eyebrow>
          <Section.Title>
            Softwares oficiais para arquitetura, engenharia e construção
          </Section.Title>
          <Section.Description>
            Teste sem compromisso, pague em condições flexíveis e tenha suporte
            humano em português.
          </Section.Description>
        </Section.Header>

        <div className="grid auto-rows-[minmax(16rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}

          <article className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground sm:col-span-2">
            <div className="flex flex-col gap-3">
              <Badge variant="accent" size="sm">
                <Puzzle aria-hidden="true" />
                Plugins e complementos
              </Badge>
              <h3 className="text-pretty text-2xl font-semibold">
                Vá além com o seu CAD e o seu SketchUp
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/85">
                Extensões especializadas para acelerar o fluxo de trabalho:
              </p>
              <ul className="flex flex-wrap gap-2">
                {plugins.map((plugin) => (
                  <li
                    key={plugin}
                    className="rounded-md bg-primary-foreground/15 px-3 py-1 font-mono text-xs font-semibold"
                  >
                    {plugin}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Ver plugins
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </Section.Container>
    </Section.Root>
  );
}
