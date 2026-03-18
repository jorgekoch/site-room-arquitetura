import { HeroBase } from "../components/sections/HeroBase";
import { ServiceSectionBase } from "../components/sections/ServiceSectionBase";
import { AboutSectionBase } from "../components/sections/AboutSectionBase";
import { ContactCtaBase } from "../components/sections/ContactCtaBase";
import { siteConfig } from "../config/site";
import { homeData } from "../data/home";
import { servicesData } from "../data/services";
import { aboutData } from "../data/about";

export function Home() {
  return (
    <>
      <HeroBase
        eyebrow={homeData.hero.eyebrow}
        title={homeData.hero.title}
        description={homeData.hero.description}
        primaryCta={{
          label: siteConfig.cta.primaryLabel,
          to: siteConfig.cta.primaryTo,
        }}
        secondaryCta={{
          label: siteConfig.cta.secondaryLabel,
          to: siteConfig.cta.secondaryTo,
        }}
        highlights={homeData.hero.highlights}
      />

      <ServiceSectionBase
        eyebrow={servicesData.section.eyebrow}
        title={servicesData.section.title}
        description={servicesData.section.description}
        items={servicesData.items}
        cta={servicesData.sectionCta}
      />

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

      <ContactCtaBase
        eyebrow={homeData.finalCta.eyebrow}
        title={homeData.finalCta.title}
        description={homeData.finalCta.description}
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