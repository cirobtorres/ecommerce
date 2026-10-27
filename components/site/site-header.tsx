"use client";

import { Mail, Menu, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { contact, navLinks } from "@/lib/site-data";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <p className="font-mono text-navy-foreground/70">
            <span className="text-accent">20+ anos</span> distribuindo software
            de projeto no Brasil
          </p>
          <div className="flex items-center gap-5 text-navy-foreground/80">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-18">
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="primary" className="hidden sm:inline-flex">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Falar com especialista
              </a>
            </Button>

            <Sheet.Root open={open} onOpenChange={setOpen}>
              <Sheet.Trigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Title className="sr-only">Menu de navegação</Sheet.Title>
                <Sheet.Description className="sr-only">
                  Links para as seções da página
                </Sheet.Description>
                <Logo onClick={() => setOpen(false)} />
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {navLinks.map((link) => (
                      <li key={link.id} className="border-b border-border">
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block py-3 text-base font-medium transition-colors hover:text-primary"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button asChild size="lg" className="mt-auto">
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" />
                    Falar com especialista
                  </a>
                </Button>
              </Sheet.Content>
            </Sheet.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
