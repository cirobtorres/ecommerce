import { About } from "@/components/site/about";
import { Benefits } from "@/components/site/benefits";
import { Challenges } from "@/components/site/challenges";
import { Clients } from "@/components/site/clients";
import { ContactCta } from "@/components/site/contact-cta";
import { Courses } from "@/components/site/courses";
import { EcosystemBanner } from "@/components/site/ecosystem-banner";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Products } from "@/components/site/products";
import { Segments } from "@/components/site/segments";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Steps } from "@/components/site/steps";
import { WhatsappFloat } from "@/components/site/whatsapp-float";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Challenges />
        <Products />
        <EcosystemBanner />
        <About />
        <Segments />
        <Clients />
        <Benefits />
        <Courses />
        <Steps />
        <Faq />
        <ContactCta />
      </main>
      <SiteFooter />
      <WhatsappFloat />
    </>
  );
}
