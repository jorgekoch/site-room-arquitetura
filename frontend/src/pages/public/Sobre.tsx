import { AboutPageSection } from "../../components/sections/AboutPageSection";
import { ContactCtaBase } from "../../components/sections/ContactCtaBase";
import { siteConfig } from "../../config/site";
import { aboutData } from "../../data/about";

export function Sobre() {
  return (
    <>
      <AboutPageSection data={aboutData} />

      <ContactCtaBase
        eyebrow="Próximo passo"
        title="Vamos conversar sobre o seu projeto?"
        description="Se a proposta da ROOM faz sentido para o seu momento, o próximo passo é preencher a solicitação de proposta."
        primaryCta={{
          label: siteConfig.cta.primaryLabel,
          to: siteConfig.cta.primaryTo,
        }}
        secondaryCta={{
          label: siteConfig.cta.secondaryLabel,
          to: siteConfig.cta.secondaryTo,
        }}
      />
    </>
  );
}
