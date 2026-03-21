import { z } from "zod";

export const proposalSchema = z
  .object({
    email: z.string().email("Digite um e-mail válido."),
    fullName: z.string().min(3, "Informe o nome completo."),
    cpf: z.string().min(11, "Informe um CPF válido."),
    address: z.string().min(10, "Informe o endereço completo."),
    birthDate: z.string().min(1, "Informe a data de nascimento."),
    phone: z.string().min(8, "Informe um telefone válido."),
    socialProfile: z.string().optional(),
    preferredContactMethod: z.string().min(1, "Selecione a melhor forma de contato."),
    referralSource: z.string().min(1, "Selecione como conheceu a ROOM."),
    desiredWorkStart: z.string().min(1, "Informe o prazo desejado."),
    projectType: z.string().min(1, "Selecione o tipo de projeto."),

    newConstruction: z.object({
      terrainSize: z.string().optional(),
      terrainSlope: z.string().optional(),
      terrainZone: z.string().optional(),
      terrainAddress: z.string().optional(),
      scopeDescription: z.string().optional(),
      floors: z.string().optional(),
      desiredArea: z.string().optional(),
      definedBudget: z.string().optional(),
      wantsEngineeringPartnership: z.string().optional(),
      referencesLinks: z.string().optional(),
      observations: z.string().optional(),
      projectMode: z.string().optional(),
    }),

    interiors: z.object({
      includedItems: z.array(z.string()),
      includedItemsOther: z.string().optional(),
      environments: z.string().optional(),
      referencesLinks: z.string().optional(),
      observations: z.string().optional(),
      projectMode: z.string().optional(),
    }),

    renovation: z.object({
      projectDescription: z.string().optional(),
      locationAddress: z.string().optional(),
      referencesLinks: z.string().optional(),
      observations: z.string().optional(),
      projectMode: z.string().optional(),
    }),

    consulting: z.object({
      requestDescription: z.string().optional(),
    }),

    taxAgreement: z.boolean(),
    paymentMethod: z.string().min(1, "Selecione a forma de pagamento."),
    paymentMethodOther: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.projectType === "new-construction") {
      if (!data.newConstruction.terrainSize) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "terrainSize"],
          message: "Informe o tamanho do terreno.",
        });
      }
      if (!data.newConstruction.terrainSlope) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "terrainSlope"],
          message: "Selecione a inclinação do terreno.",
        });
      }
      if (!data.newConstruction.terrainZone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "terrainZone"],
          message: "Selecione se o terreno é rural ou urbano.",
        });
      }
      if (!data.newConstruction.terrainAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "terrainAddress"],
          message: "Informe o endereço do terreno.",
        });
      }
      if (!data.newConstruction.scopeDescription) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "scopeDescription"],
          message: "Descreva o escopo do projeto.",
        });
      }
      if (!data.newConstruction.floors) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "floors"],
          message: "Selecione a quantidade de pavimentos.",
        });
      }
      if (!data.newConstruction.wantsEngineeringPartnership) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "wantsEngineeringPartnership"],
          message: "Informe se deseja incluir a parceria de engenharia.",
        });
      }
      if (!data.newConstruction.referencesLinks) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "referencesLinks"],
          message: "Adicione links de referências/fotos.",
        });
      }
      if (!data.newConstruction.projectMode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newConstruction", "projectMode"],
          message: "Selecione presencial ou online.",
        });
      }
    }

    if (data.projectType === "interiors") {
      if (!data.interiors.includedItems.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["interiors", "includedItems"],
          message: "Selecione pelo menos um item.",
        });
      }
      if (!data.interiors.environments) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["interiors", "environments"],
          message: "Informe os ambientes a serem projetados.",
        });
      }
      if (!data.interiors.referencesLinks) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["interiors", "referencesLinks"],
          message: "Adicione links de referências/fotos.",
        });
      }
      if (!data.interiors.projectMode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["interiors", "projectMode"],
          message: "Selecione presencial ou online.",
        });
      }
    }

    if (data.projectType === "renovation") {
      if (!data.renovation.projectDescription) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["renovation", "projectDescription"],
          message: "Descreva o projeto de reforma/ampliação.",
        });
      }
      if (!data.renovation.locationAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["renovation", "locationAddress"],
          message: "Informe o endereço do local.",
        });
      }
      if (!data.renovation.referencesLinks) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["renovation", "referencesLinks"],
          message: "Adicione links de referências/fotos.",
        });
      }
      if (!data.renovation.projectMode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["renovation", "projectMode"],
          message: "Selecione presencial ou online.",
        });
      }
    }

    if (data.projectType === "consulting" || data.projectType === "other") {
      if (!data.consulting.requestDescription) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["consulting", "requestDescription"],
          message: "Descreva sua solicitação.",
        });
      }
    }

    if (!data.taxAgreement) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["taxAgreement"],
        message: "É necessário concordar com os termos.",
      });
    }

    if (data.paymentMethod === "outro" && !data.paymentMethodOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentMethodOther"],
        message: "Descreva a outra forma de pagamento.",
      });
    }
  });

  export type ProposalSchemaValue = 
  z.infer<typeof proposalSchema>;