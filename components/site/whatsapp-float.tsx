import { MessageCircle } from "lucide-react";

import { contact } from "@/lib/site-data";

export function WhatsappFloat() {
  return (
    <a
      href={contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-navy/25 ring-4 ring-accent/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-ring"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
