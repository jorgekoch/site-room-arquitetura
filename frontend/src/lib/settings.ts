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
  const token =
    localStorage.getItem("room_admin_token");

  const response = await publicApiFetch(
    "/settings",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data =
      await response.json().catch(
        () => null
      );

    throw new Error(
      data?.message ||
        "Não foi possível carregar as configurações do site."
    );
  }

  const data =
    await response.json();

  return data.settings;
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
  const token =
    localStorage.getItem("room_admin_token");

  const response =
    await publicApiFetch(
      "/settings",
      {
        method: "PATCH",

        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

  const responseData =
    await response.json().catch(
      () => null
    );

  if (!response.ok) {
    throw new Error(
      responseData?.message ||
        "Não foi possível atualizar as configurações do site."
    );
  }

  return responseData.settings;
}