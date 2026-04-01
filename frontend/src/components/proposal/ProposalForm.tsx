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
import { ThemeToggle } from "../ui/ThemeToggle";

const ErrorBox = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(255, 107, 107, 0.35);
  background: rgba(255, 107, 107, 0.08);
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.6;
`;

const SuccessBox = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(72, 187, 120, 0.35);
  background: rgba(72, 187, 120, 0.1);
  color: ${({ theme }) => theme.colors.success};
  line-height: 1.6;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const defaultValues: ProposalSchemaValues = {
  email: "",
  fullName: "",
  cpf: "",
  address: "",
  birthDate: "",
  phone: "",
  socialProfile: "",

  preferredContactMethod: "",
  preferredContactMethodOther: "",

  referralSource: "",
  referralSourceOther: "",

  desiredWorkStart: "",

  projectType: "",
  projectTypeOther: "",

  newConstruction: {
    terrainSize: "",
    terrainSlope: "",
    terrainSlopeOther: "",
    terrainZone: "",
    terrainZoneOther: "",
    terrainAddress: "",
    scopeDescription: "",
    floors: "",
    floorsOther: "",
    desiredArea: "",
    definedBudget: "",
    wantsEngineeringPartnership: "",
    referencesLinks: "",
    observations: "",
    projectMode: "",
  },

  interiors: {
    includedItems: [],
    includedItemsOther: "",
    environments: "",
    referencesLinks: "",
    observations: "",
    projectMode: "",
  },

  renovation: {
    projectDescription: "",
    locationAddress: "",
    referencesLinks: "",
    observations: "",
    projectMode: "",
  },

  consulting: {
    requestDescription: "",
  },

  taxAgreement: false,
  paymentMethod: "",
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
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);

  const projectType = methods.watch("projectType");
  const reviewConfirmed = methods.watch("reviewConfirmed");

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
    const isValid = await methods.trigger(currentFields as never[]);

    if (!isValid) return;
    if (step < steps.length - 1) setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step > 0) setStep((prev) => prev - 1);
  }

  function handleAddReferenceFiles(files: File[]) {
    setReferenceFiles((prev) => [...prev, ...files]);
  }

  function handleRemoveReferenceFile(indexToRemove: number) {
    setReferenceFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  }

  async function onSubmit(values: ProposalSchemaValues) {
    try {
      setSubmitError("");
      setSubmitSuccess("");
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("fullName", values.fullName);
      formData.append("cpf", values.cpf);
      formData.append("address", values.address);
      formData.append("birthDate", values.birthDate);
      formData.append("phone", values.phone);
      formData.append("socialProfile", values.socialProfile || "");

      formData.append("preferredContactMethod", values.preferredContactMethod);
      formData.append(
        "preferredContactMethodOther",
        values.preferredContactMethodOther || ""
      );

      formData.append("referralSource", values.referralSource);
      formData.append("referralSourceOther", values.referralSourceOther || "");

      formData.append("desiredWorkStart", values.desiredWorkStart);

      formData.append("projectType", values.projectType);
      formData.append("projectTypeOther", values.projectTypeOther || "");

      formData.append("taxAgreement", String(values.taxAgreement));
      formData.append("paymentMethod", values.paymentMethod);
      formData.append("paymentMethodOther", values.paymentMethodOther || "");
      formData.append("reviewConfirmed", String(values.reviewConfirmed));

      formData.append(
        "newConstruction",
        JSON.stringify(values.newConstruction)
      );
      formData.append("interiors", JSON.stringify(values.interiors));
      formData.append("renovation", JSON.stringify(values.renovation));
      formData.append("consulting", JSON.stringify(values.consulting));

      referenceFiles.forEach((file) => {
        formData.append("referenceFiles", file);
      });

      if (paymentProofFile) {
        formData.append("paymentProof", paymentProofFile);
      }

      const response = await publicApiFetch("/proposal-requests", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao enviar solicitação.");
      }

      sessionStorage.setItem("proposalSent", "true");

      setSubmitSuccess(
        "Solicitação enviada com sucesso. Recebemos seus dados e já registramos suas informações no sistema. Você será direcionado para a próxima etapa."
      );

      setTimeout(() => {
        window.location.href = "/proposta-enviada";
      }, 1800);
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

          <ThemeToggle />
        </TopBar>

        <ProposalProgress currentStep={step} totalSteps={steps.length} />

        {currentStepKey === "personal" && <StepPersonalInfo />}
        {currentStepKey === "context" && <StepProjectContext />}

        {currentStepKey === "new-construction" && (
          <StepNewConstruction
            referenceFiles={referenceFiles}
            onAddReferenceFiles={handleAddReferenceFiles}
            onRemoveReferenceFile={handleRemoveReferenceFile}
          />
        )}

        {currentStepKey === "interiors" && (
          <StepInteriors
            referenceFiles={referenceFiles}
            onAddReferenceFiles={handleAddReferenceFiles}
            onRemoveReferenceFile={handleRemoveReferenceFile}
          />
        )}

        {currentStepKey === "renovation" && (
          <StepRenovation
            referenceFiles={referenceFiles}
            onAddReferenceFiles={handleAddReferenceFiles}
            onRemoveReferenceFile={handleRemoveReferenceFile}
          />
        )}

        {currentStepKey === "consulting" && <StepConsulting />}

        {currentStepKey === "payment" && (
          <StepPayment
            pixKey="SUA_CHAVE_PIX_AQUI"
            selectedProofFile={paymentProofFile}
            onSelectProofFile={setPaymentProofFile}
          />
        )}

        {currentStepKey === "review" && <StepReview />}

        {submitSuccess && <SuccessBox>{submitSuccess}</SuccessBox>}
        {submitError && <ErrorBox>{submitError}</ErrorBox>}

        <ProposalNavigation
          currentStep={step}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onSubmitStep={submitForm}
          isSubmitting={isSubmitting}
          isSubmitDisabled={!reviewConfirmed || Boolean(submitSuccess)}
        />
      </form>
    </FormProvider>
  );
}