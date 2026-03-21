import { GallerySectionBase } from "../components/sections/GallerySectionBase";
import { galleryData } from "../data/gallery";
import { ContactCtaBase } from "../components/sections/ContactCtaBase";
import { siteConfig } from "../config/site";

export function Galeria() {
  return (
    <>
      <GallerySectionBase
        eyebrow={galleryData.section.eyebrow}
        title={galleryData.section.title}
        description={galleryData.section.description}
        items={galleryData.items}
      />

      <ContactCtaBase
        eyebrow="Próximo passo"
        title="Transforme sua presença visual em algo mais forte e profissional"
        description="Uma boa galeria ou portfólio ajuda a mostrar qualidade, gerar confiança e tornar sua comunicação mais concreta."
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