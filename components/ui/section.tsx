import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("relative py-16 md:py-24", {
  variants: {
    tone: {
      default: "bg-background text-foreground",
      muted: "bg-surface text-foreground",
      navy: "bg-navy text-navy-foreground",
    },
  },
  defaultVariants: { tone: "default" },
});

type SectionRootProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants>;

function SectionRoot({ className, tone, ...props }: SectionRootProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ tone }), className)}
      {...props}
    />
  );
}

function SectionContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-container"
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6", className)}
      {...props}
    />
  );
}

const sectionHeaderVariants = cva("mb-10 flex flex-col gap-3 md:mb-14", {
  variants: {
    align: {
      center: "mx-auto max-w-3xl items-center text-center",
      start: "max-w-3xl items-start text-left",
    },
  },
  defaultVariants: { align: "center" },
});

type SectionHeaderProps = React.ComponentProps<"header"> &
  VariantProps<typeof sectionHeaderVariants>;

function SectionHeader({ className, align, ...props }: SectionHeaderProps) {
  return (
    <header
      data-slot="section-header"
      className={cn(sectionHeaderVariants({ align }), className)}
      {...props}
    />
  );
}

function SectionEyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-eyebrow"
      className={cn(
        "flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-primary",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-title"
      className={cn(
        "text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

function SectionDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-description"
      className={cn(
        "text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
        className,
      )}
      {...props}
    />
  );
}

const Section = {
  Root: SectionRoot,
  Container: SectionContainer,
  Header: SectionHeader,
  Eyebrow: SectionEyebrow,
  Title: SectionTitle,
  Description: SectionDescription,
};

export { Section };
