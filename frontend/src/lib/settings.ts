import { publicApiFetch } from "./publicApi";

export interface SiteSettings {
  id: string;
  createdAt: string;
  updatedAt: string;
  whatsapp: string | null;
  instagram: string | null;
  maxProjectImages: number;
  maxProjectImageSizeMb: number;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await publicApiFetch(
    "/settings"
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar as configurações do site."
    );
  }

  const data =
    await response.json();

  return data.settings;
}