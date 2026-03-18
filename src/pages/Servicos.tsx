import { ServiceSectionBase } from "../components/sections/ServiceSectionBase";
import { FaqSectionBase } from "../components/sections/FaqSectionBase";
import { ContactCtaBase } from "../components/sections/ContactCtaBase";
import { siteConfig } from "../config/site";
import { servicesData } from "../data/services";
import { faqData } from "../data/faq";

export function Servicos() {
  return (
    <>
      <ServiceSectionBase
        eyebrow={servicesData.section.eyebrow}
        title={servicesData.section.title}
        description={servicesData.section.description}
        items={servicesData.items}
        cta={servicesData.sectionCta}
      />

      <FaqSectionBase
        eyebrow="Dúvidas sobre os serviços"
        title="Perguntas que ajudam a entender qual formato faz mais sentido"
        description="Essa seção pode ajudar o cliente a escolher o tipo de site ideal antes do contato."
        items={faqData.services}
      />

      <ContactCtaBase
        eyebrow={servicesData.finalCta.eyebrow}
        title={servicesData.finalCta.title}
        description={servicesData.finalCta.description}
        primaryCta={{
          label: siteConfig.cta.primaryLabel,
          to: siteConfig.cta.primaryTo,
        }}
        secondaryCta={{ label: "Voltar para início", to: "/" }}
      />
    </>
  );
}