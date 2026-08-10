import type { ProjectCategory } from "../types/project";

export const projectCategoryLabels: Record<
  ProjectCategory,
  string
> = {
  RESIDENTIAL: "Residencial",
  INTERIORS: "Interiores",
  COMMERCIAL: "Comercial",
  LANDSCAPE: "Paisagismo",
  CONSULTING: "Consultoria",
  OTHER: "Outro",
};

export function getProjectCategoryLabel(
  category: ProjectCategory
) {
  return (
    projectCategoryLabels[category] ??
    category
  );
}