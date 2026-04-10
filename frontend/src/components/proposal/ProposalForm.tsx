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
  border: 1px solid ${({ theme }) => theme.colors.dangerBorder};
  background: ${({ theme }) => theme.colors.dangerSoft};
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.6;
`;

const SuccessBox = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  background: ${({ theme }) => theme.colors.successSoft};
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

type UploadedReferenceFile = {
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
  storageKey: string;
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

  async function uploadFileToR2(file: File, kind: "reference" | "payment-proof") {
    const createUploadResponse = await publicApiFetch("/proposal-requests/upload-url", {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        kind,
      }),
    });

    if (!createUploadResponse.ok) {
      const errorData = await createUploadResponse.json().catch(() => null);
      throw new Error(errorData?.message || "Erro ao gerar URL de upload.");
    }

    const {
      uploadUrl,
      fileUrl,
      storageKey,
      fileName,
    } = await createUploadResponse.json();

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Falha ao enviar arquivo para armazenamento (${file.name}).`);
    }

    return {
      originalName: file.name,
      fileName,
      mimeType: file.type,
      size: file.size,
      url: fileUrl,
      storageKey,
    };
  }

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

      let uploadedPaymentProof: UploadedReferenceFile | null = null;
      let uploadedReferenceFiles: UploadedReferenceFile[] = [];

      if (paymentProofFile) {
        uploadedPaymentProof = await uploadFileToR2(paymentProofFile, "payment-proof");
      }

      if (referenceFiles.length) {
        uploadedReferenceFiles = await Promise.all(
          referenceFiles.map((file) => uploadFileToR2(file, "reference"))
        );
      }

      const payload = {
        email: values.email,
        fullName: values.fullName,
        cpf: values.cpf,
        address: values.address,
        birthDate: values.birthDate,
        phone: values.phone,
        socialProfile: values.socialProfile || "",

        preferredContactMethod: values.preferredContactMethod,
        preferredContactMethodOther: values.preferredContactMethodOther || "",

        referralSource: values.referralSource,
        referralSourceOther: values.referralSourceOther || "",

        desiredWorkStart: values.desiredWorkStart,

        projectType: values.projectType,
        projectTypeOther: values.projectTypeOther || "",

        taxAgreement: values.taxAgreement,
        paymentMethod: values.paymentMethod,
        paymentMethodOther: values.paymentMethodOther || "",
        reviewConfirmed: values.reviewConfirmed,

        newConstruction: values.newConstruction,
        interiors: values.interiors,
        renovation: values.renovation,
        consulting: values.consulting,

        paymentProofUrl: uploadedPaymentProof?.url || null,
        paymentProofStorageKey: uploadedPaymentProof?.storageKey || null,
        referenceFilesJson: uploadedReferenceFiles,
      };

      const response = await publicApiFetch("/proposal-requests", {
        method: "POST",
        body: JSON.stringify(payload),
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
            pixKey="20.709.790/0001-96"
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
