import { Section } from "@/components/ui/section";
import { steps } from "@/lib/site-data";

export function Steps() {
  return (
    <Section.Root>
      <Section.Container>
        <Section.Header>
          <Section.Eyebrow>Simples do início ao fim</Section.Eyebrow>
          <Section.Title>Como comprar na TotalCad</Section.Title>
        </Section.Header>

        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px bg-border md:inset-x-[12.5%] md:bottom-auto md:h-px md:w-auto"
          />
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="relative flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span
                className={
                  index === 0
                    ? "relative flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-lg font-bold text-primary-foreground ring-8 ring-primary/15"
                    : "relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-lg font-bold text-primary"
                }
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section.Container>
    </Section.Root>
  );
}
