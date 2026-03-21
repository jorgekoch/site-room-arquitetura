export type ContactMethod =
  | "telefone"
  | "whatsapp"
  | "telegram"
  | "instagram"
  | "outro";

export type ReferralSource =
  | "instagram"
  | "youtube"
  | "google"
  | "indicacao"
  | "grupo-construtores-inteligentes"
  | "lista-green"
  | "amanda-e-fernando-cbcs"
  | "outro";

export type ProjectType =
  | "new-construction"
  | "interiors"
  | "renovation"
  | "consulting"
  | "other";

export type ProjectMode = "presencial" | "online";
export type PaymentMethod = "pix" | "boleto" | "outro";

export type TerrainSlope =
  | "plano"
  | "levemente-inclinado"
  | "bastante-inclinado"
  | "outro";

export type TerrainZone = "rural" | "urbano" | "outro";

export type FloorsOption =
  | "terrea"
  | "2-pavimentos"
  | "3-ou-mais"
  | "gostaria-que-o-projeto-sugerisse"
  | "outro";

export type InteriorsScopeOption =
  | "moveis-planejados"
  | "moveis-soltos"
  | "iluminacao"
  | "forro"
  | "pinturas-e-revestimentos"
  | "decor"
  | "outro";

export type ProposalFormValues = {
  email: string;
  fullName: string;
  cpf: string;
  address: string;
  birthDate: string;
  phone: string;
  socialProfile: string;
  preferredContactMethod: ContactMethod;
  referralSource: ReferralSource;
  desiredWorkStart: string;
  projectType: ProjectType;

  newConstruction: {
    terrainSize: string;
    terrainSlope: TerrainSlope;
    terrainZone: TerrainZone;
    terrainAddress: string;
    scopeDescription: string;
    floors: FloorsOption;
    desiredArea: string;
    definedBudget: string;
    wantsEngineeringPartnership: string;
    referencesLinks: string;
    observations: string;
    projectMode: ProjectMode;
  };

  interiors: {
    includedItems: InteriorsScopeOption[];
    includedItemsOther: string;
    environments: string;
    referencesLinks: string;
    observations: string;
    projectMode: ProjectMode;
  };

  renovation: {
    projectDescription: string;
    locationAddress: string;
    referencesLinks: string;
    observations: string;
    projectMode: ProjectMode;
  };

  consulting: {
    requestDescription: string;
  };

  taxAgreement: boolean;
  paymentMethod: PaymentMethod;
  paymentMethodOther: string;
};