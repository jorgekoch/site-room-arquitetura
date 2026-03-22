import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalSchemaValues,
} from "../../schemas/proposalSchema";
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
import styled from "styled-components";
import { Button } from "../ui/Button";
import { publicApiFetch } from "../../lib/publicApi";

const ErrorBox = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(255, 107, 107, 0.35);
  background: rgba(255, 107, 107, 0.08);
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.6;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

const API_URL = import.meta.env.VITE_API_URL;

const defaultValues: ProposalSchemaValues = {
  email: "",
  fullName: "",
  cpf: "",
  address: "",
  birthDate: "",
  phone: "",
  socialProfile: "",

  preferredContactMethod: "whatsapp",
  preferredContactMethodOther: "",

  referralSource: "instagram",
  referralSourceOther: "",

  desiredWorkStart: "",

  projectType: "new-construction",
  projectTypeOther: "",

  newConstruction: {
    terrainSize: "",
    terrainSlope: "plano",
    terrainSlopeOther: "",
    terrainZone: "urbano",
    terrainZoneOther: "",
    terrainAddress: "",
    scopeDescription: "",
    floors: "terrea",
    floorsOther: "",
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

  reviewConfirmed: false,
};

export function ProposalForm() {
  const methods = useForm<ProposalSchemaValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues,
    mode: "onBlur",
  });

  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectType = methods.watch("projectType");

  const reviewConfirmed = 
  methods.watch("reviewConfirmed");

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
        "preferredContactMethodOther",
        "referralSource",
        "referralSourceOther",
      ],
      context: ["desiredWorkStart", "projectType", "projectTypeOther"],
      "new-construction": [
        "newConstruction.terrainSize",
        "newConstruction.terrainSlope",
        "newConstruction.terrainSlopeOther",
        "newConstruction.terrainZone",
        "newConstruction.terrainZoneOther",
        "newConstruction.terrainAddress",
        "newConstruction.scopeDescription",
        "newConstruction.floors",
        "newConstruction.floorsOther",
        "newConstruction.wantsEngineeringPartnership",
        "newConstruction.referencesLinks",
        "newConstruction.projectMode",
      ],
      interiors: [
        "interiors.includedItems",
        "interiors.includedItemsOther",
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
      consulting: ["consulting.requestDescription", "projectTypeOther"],
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

  async function onSubmit(values: ProposalSchemaValues) {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const response = await publicApiFetch("/proposal-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao enviar solicitação.");
      }

      window.location.href = "/proposta-enviada";
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const submitForm = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()}>
        <TopBar>
          <Button to="/" variant="ghost">
            Voltar ao início
          </Button>
        </TopBar>

        <ProposalProgress currentStep={step} totalSteps={steps.length} />

        {currentStepKey === "personal" && <StepPersonalInfo />}
        {currentStepKey === "context" && <StepProjectContext />}
        {currentStepKey === "new-construction" && <StepNewConstruction />}
        {currentStepKey === "interiors" && <StepInteriors />}
        {currentStepKey === "renovation" && <StepRenovation />}
        {currentStepKey === "consulting" && <StepConsulting />}
        {currentStepKey === "payment" && <StepPayment />}
        {currentStepKey === "review" && <StepReview />}

        {submitError && <ErrorBox>{submitError}</ErrorBox>}

        <ProposalNavigation
          currentStep={step}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onSubmitStep={submitForm}
          isSubmitting={isSubmitting}
          isSubmitDisabled={!reviewConfirmed}
        />
      </form>
    </FormProvider>
  );
}