import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { contact, footerColumns } from "@/lib/site-data";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-navy-foreground/70">
            Distribuidora oficial de softwares de CAD, BIM, 3D e render. Há mais
            de 20 anos no Brasil.
          </p>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.id} aria-label={column.title}>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#softwares"
                    className="text-sm text-navy-foreground/75 transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Contato
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-navy-foreground/75">
            <li>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="size-4 text-primary" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <MessageCircle
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
                {contact.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 break-all transition-colors hover:text-accent"
              >
                <Mail
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              Atendimento em todo o Brasil
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-navy-foreground/55 sm:px-6">
          {
            "© 2026 TotalCad. Todos os direitos reservados. AutoCAD®, 3ds Max® e Cinema 4D® são marcas de seus respectivos titulares."
          }
        </p>
      </div>
    </footer>
  );
}
