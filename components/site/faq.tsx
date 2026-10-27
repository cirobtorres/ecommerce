"use client";

import { Accordion } from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";
import { faqs } from "@/lib/site-data";

export function Faq() {
  return (
    <Section.Root id="duvidas" tone="muted">
      <Section.Container className="max-w-4xl">
        <Section.Header>
          <Section.Eyebrow>Dúvidas frequentes</Section.Eyebrow>
          <Section.Title>
            Tudo o que você precisa saber antes de comprar
          </Section.Title>
        </Section.Header>

        <Accordion.Root type="single" collapsible defaultValue={faqs[0].id}>
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id}>
              <Accordion.Trigger>{faq.question}</Accordion.Trigger>
              <Accordion.Content>{faq.answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section.Container>
    </Section.Root>
  );
}
