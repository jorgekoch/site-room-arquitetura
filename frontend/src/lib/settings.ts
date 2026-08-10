import { publicApiFetch } from "./publicApi";
import {
  apiGet,
  apiPatch,
} from "./api";

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
  const response = await apiGet<{
    settings: SiteSettings;
  }>("/settings");

  return response.settings;
}

export interface UpdateSiteSettingsInput {
  whatsapp: string;
  instagram: string;
  maxProjectImages: number;
  maxProjectImageSizeMb: number;
}

export async function updateSiteSettings(
  data: UpdateSiteSettingsInput
): Promise<SiteSettings> {
  const response =
    await apiPatch<{
      message: string;
      settings: SiteSettings;
    }>("/settings", data);

  return response.settings;
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  const response =
    await publicApiFetch(
      "/settings"
    );

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar as configurações públicas."
    );
  }

  const data =
    await response.json();

  return data.settings;
}