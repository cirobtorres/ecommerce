import type * as React from "react";

import { cn } from "@/lib/utils";

type LogoProps = React.ComponentProps<"a"> & { tone?: "dark" | "light" };

export function Logo({ className, tone = "dark", ...props }: LogoProps) {
  return (
    <a
      href="#inicio"
      aria-label="TotalCad, página inicial"
      className={cn(
        "flex items-center gap-2 font-sans text-xl font-bold tracking-tight",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground"
      >
        T<span className="text-accent">c</span>
      </span>
      <span
        className={
          tone === "light" ? "text-navy-foreground" : "text-foreground"
        }
      >
        total<span className="text-primary">cad</span>
      </span>
    </a>
  );
}
