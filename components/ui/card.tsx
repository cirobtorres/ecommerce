import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group/card relative flex flex-col overflow-hidden rounded-lg",
  {
    variants: {
      variant: {
        default: "border border-border bg-card text-card-foreground",
        interactive:
          "border border-border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        muted: "bg-surface text-foreground",
        navy: "bg-navy text-navy-foreground",
      },
      padding: {
        none: "",
        md: "gap-3 p-5",
        lg: "gap-4 p-6 md:p-7",
      },
    },
    defaultVariants: { variant: "default", padding: "md" },
  },
);

type CardRootProps = React.ComponentProps<"article"> &
  VariantProps<typeof cardVariants>;

function CardRoot({ className, variant, padding, ...props }: CardRootProps) {
  return (
    <article
      data-slot="card"
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  );
}

function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-icon"
      aria-hidden="true"
      className={cn(
        "flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover/card:bg-primary group-hover/card:text-primary-foreground [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function CardEyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-eyebrow"
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-wider text-primary",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-pretty text-lg font-semibold leading-snug",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-pretty text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="card-footer"
      className={cn("mt-auto flex items-center gap-2", className)}
      {...props}
    />
  );
}

const Card = {
  Root: CardRoot,
  Icon: CardIcon,
  Header: CardHeader,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};

export { Card, cardVariants };
