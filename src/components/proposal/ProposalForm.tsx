import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proposalSchema, type ProposalSchemaValue } from "../../schemas/proposalSchema";
import { StepPersonalInfo } from "./steps/StepPersonalInfo";
import { StepProjectContext } from "./steps/StepProjectContext";
import { StepNewConstruction } from "./steps/StepNewConstruction";
import { StepInteriors } from "./steps/StepInteriors";
import { StepRenovation } from "./steps/StepRenovation";
import { StepConsulting } from "./steps/StepConsulting";
import { StepPayment } from "./steps/StepPayment";
import { StepReview } from "./steps/StepReview";
import { ProposalNavigation } from "./ProposalNavigation";
import { ProposalProgress } from "./ProposalProgress";

const defaultValues: ProposalSchemaValue = {
  email: "",
  fullName: "",
  cpf: "",
  address: "",
  birthDate: "",
  phone: "",
  socialProfile: "",
  preferredContactMethod: "whatsapp",
  referralSource: "instagram",
  desiredWorkStart: "",
  projectType: "new-construction",

  newConstruction: {
    terrainSize: "",
    terrainSlope: "plano",
    terrainZone: "urbano",
    terrainAddress: "",
    scopeDescription: "",
    floors: "terrea",
    desiredArea: "",
    definedBudget: "",
    wantsEngineeringPartnership: "",
    referencesLinks: "",
    observations: "",
    projectMode: "online",
  },

  interiors: {
    includedItems: [],
    includedItemsOther: "",
    environments: "",
    referencesLinks: "",
    observations: "",
    projectMode: "online",
  },

  renovation: {
    projectDescription: "",
    locationAddress: "",
    referencesLinks: "",
    observations: "",
    projectMode: "online",
  },

  consulting: {
    requestDescription: "",
  },

  taxAgreement: false,
  paymentMethod: "pix",
  paymentMethodOther: "",
};

export function ProposalForm() {
  const methods = useForm<ProposalSchemaValue>({
    resolver: zodResolver(proposalSchema),
    defaultValues,
    mode: "onBlur",
  });

  const [step, setStep] = useState(0);
  const projectType = methods.watch("projectType");

  const steps = useMemo(() => {
    const base = ["personal", "context"];

    if (projectType === "new-construction") base.push("new-construction");
    if (projectType === "interiors") base.push("interiors");
    if (projectType === "renovation") base.push("renovation");
    if (projectType === "consulting" || projectType === "other") {
      base.push("consulting");
    }

    base.push("payment", "review");
    return base;
  }, [projectType]);

  const currentStepKey = steps[step];

  async function handleNext() {
    const fieldsByStep: Record<string, string[]> = {
      personal: [
        "email",
        "fullName",
        "cpf",
        "address",
        "birthDate",
        "phone",
        "preferredContactMethod",
        "referralSource",
      ],
      context: ["desiredWorkStart", "projectType"],
      "new-construction": [
        "newConstruction.terrainSize",
        "newConstruction.terrainSlope",
        "newConstruction.terrainZone",
        "newConstruction.terrainAddress",
        "newConstruction.scopeDescription",
        "newConstruction.floors",
        "newConstruction.wantsEngineeringPartnership",
        "newConstruction.referencesLinks",
        "newConstruction.projectMode",
      ],
      interiors: [
        "interiors.includedItems",
        "interiors.environments",
        "interiors.referencesLinks",
        "interiors.projectMode",
      ],
      renovation: [
        "renovation.projectDescription",
        "renovation.locationAddress",
        "renovation.referencesLinks",
        "renovation.projectMode",
      ],
      consulting: ["consulting.requestDescription"],
      payment: ["taxAgreement", "paymentMethod", "paymentMethodOther"],
      review: [],
    };

    const currentFields = fieldsByStep[currentStepKey] ?? [];
    const isValid = await methods.trigger(currentFields as any);

    if (!isValid) return;
    if (step < steps.length - 1) setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step > 0) setStep((prev) => prev - 1);
  }

  async function onSubmit(values: ProposalSchemaValue) {
    console.log("Dados prontos para enviar ao backend:", values);

    // Trocar depois por integração real:
    // await fetch("/api/proposal-requests", { method: "POST", body: JSON.stringify(values) })

    window.location.href = "/proposta-enviada";
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ProposalProgress currentStep={step} totalSteps={steps.length} />

        {currentStepKey === "personal" && <StepPersonalInfo />}
        {currentStepKey === "context" && <StepProjectContext />}
        {currentStepKey === "new-construction" && <StepNewConstruction />}
        {currentStepKey === "interiors" && <StepInteriors />}
        {currentStepKey === "renovation" && <StepRenovation />}
        {currentStepKey === "consulting" && <StepConsulting />}
        {currentStepKey === "payment" && <StepPayment />}
        {currentStepKey === "review" && <StepReview />}

        <ProposalNavigation
          currentStep={step}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
        />
      </form>
    </FormProvider>
  );
}