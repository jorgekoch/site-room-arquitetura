import { AboutSectionBase } from "../components/sections/AboutSectionBase";
import { AuthoritySectionBase } from "../components/sections/AuthoritySectionBase";
import { ContactCtaBase } from "../components/sections/ContactCtaBase";
import { siteConfig } from "../config/site";
import { aboutData } from "../data/about";
import { authorityData } from "../data/authority";

export function Sobre() {
  return (
    <>
      <AboutSectionBase
        eyebrow={aboutData.section.eyebrow}
        title={aboutData.section.title}
        description={aboutData.section.description}
        mainTag={aboutData.content.mainTag}
        mainTitle={aboutData.content.mainTitle}
        paragraphs={aboutData.content.paragraphs}
        bullets={aboutData.content.bullets}
        sideTag={aboutData.content.sideTag}
        sideTitle={aboutData.content.sideTitle}
        sideItems={aboutData.content.sideItems}
        showImage={false}
      />

      <AuthoritySectionBase
        eyebrow="Confiança"
        title="Elementos que fortalecem a percepção de valor"
        description="Depois da narrativa principal, essa seção pode destacar rapidamente fatores que validam experiência, método e posicionamento."
        items={authorityData.about}
      />

      <ContactCtaBase
        eyebrow={aboutData.finalCta.eyebrow}
        title={aboutData.finalCta.title}
        description={aboutData.finalCta.description}
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