import { HeroBase } from "../components/sections/HeroBase";
import { AudienceSection } from "../components/sections/AudienceSection";
import { ServiceSectionBase } from "../components/sections/ServiceSectionBase";
import { PortfolioSection } from "../components/sections/PortfolioSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { OfferingsSection } from "../components/sections/OfferingsSection";
import { AboutSectionBase } from "../components/sections/AboutSectionBase";
import { ContactCtaBase } from "../components/sections/ContactCtaBase";
import { siteConfig } from "../config/site";
import { homeData } from "../data/home";
import { audienceData } from "../data/audience";
import { servicesData } from "../data/services";
import { portfolioData } from "../data/portfolio";
import { processData } from "../data/process";
import { offeringsData } from "../data/offerings";
import { aboutData } from "../data/about";

export function Home() {
  return (
    <>
      <div id="topo">
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
          slides={homeData.hero.slides}
        />
      </div>

      <AudienceSection
        eyebrow={audienceData.section.eyebrow}
        title={audienceData.section.title}
        description={audienceData.section.description}
        items={audienceData.items}
      />

      <ServiceSectionBase
        id="como-projetamos"
        eyebrow={servicesData.section.eyebrow}
        title={servicesData.section.title}
        description={servicesData.section.description}
        items={servicesData.items}
        cta={servicesData.sectionCta}
      />

      <PortfolioSection
        eyebrow={portfolioData.section.eyebrow}
        title={portfolioData.section.title}
        description={portfolioData.section.description}
        items={portfolioData.items}
      />

      <ProcessSection
        eyebrow={processData.section.eyebrow}
        title={processData.section.title}
        description={processData.section.description}
        steps={processData.steps}
      />

      <OfferingsSection
        eyebrow={offeringsData.section.eyebrow}
        title={offeringsData.section.title}
        description={offeringsData.section.description}
        items={offeringsData.items}
        note={offeringsData.note}
      />

      <AboutSectionBase
        id="sobre"
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
        image={aboutData.content.image}
        showImage
      />

      <ContactCtaBase
        id="contato"
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