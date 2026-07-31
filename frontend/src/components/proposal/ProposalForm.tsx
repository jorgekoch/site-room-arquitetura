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

const WarningBox = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid #facc15;
  background: #fef9c3;
  color: #92400e;

  line-height: 1.6;
  white-space: pre-line;
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
  const [fileWarning, setFileWarning] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);

  const projectType = methods.watch("projectType");
  const reviewConfirmed = methods.watch("reviewConfirmed");

  async function uploadFileToR2(
    file: File,
    kind: "reference" | "payment-proof"
  ): Promise<UploadedReferenceFile> {
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `O arquivo "${file.name}" ultrapassa o limite de 20 MB.`
      );
    }

    if (!file.type) {
      throw new Error(
        `Não foi possível identificar o tipo do arquivo "${file.name}".`
      );
    }

    const createUploadResponse = await publicApiFetch(
      "/proposal-requests/upload-url",
      {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          kind,
        }),
      }
    );

    if (!createUploadResponse.ok) {
      const error = await createUploadResponse.json().catch(() => null);

      throw new Error(
        error?.message ??
          "Não foi possível preparar o upload do arquivo."
      );
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
      const message = await uploadResponse.text().catch(() => "");

      console.error("Erro do Cloudflare R2:", message);

      throw new Error(
        `Falha ao enviar "${file.name}" para o armazenamento.`
      );
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
    setFileWarning("");

    const MAX_REFERENCE_FILES = 20;
    const MAX_REFERENCE_SIZE = 20 * 1024 * 1024;

    const ignoredFiles: string[] = [];

    setReferenceFiles((previousFiles) => {
      const updatedFiles = [...previousFiles];

      for (const newFile of files) {
        if (updatedFiles.length >= MAX_REFERENCE_FILES) {
          ignoredFiles.push(
            `"${newFile.name}" (limite máximo atingido)`
          );
          continue;
        }

        if (newFile.size > MAX_REFERENCE_SIZE) {
          ignoredFiles.push(
            `"${newFile.name}" (maior que 20 MB)`
          );
          continue;
        }

        const duplicate = updatedFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size &&
            existingFile.lastModified === newFile.lastModified
        );

        if (duplicate) {
          ignoredFiles.push(
            `"${newFile.name}" (duplicado)`
          );
          continue;
        }

        updatedFiles.push(newFile);
      }

      return updatedFiles;
    });

    if (ignoredFiles.length) {
      setFileWarning(
        `Os seguintes arquivos não foram adicionados:\n\n${ignoredFiles.join("\n")}`
      );
    }
    }

    function handleRemoveReferenceFile(indexToRemove: number) {
      setFileWarning("");
      setSubmitError("");

      setReferenceFiles((previousFiles) =>
        previousFiles.filter(
          (_, index) => index !== indexToRemove
        )
      );
    }

    async function onSubmit(values: ProposalSchemaValues) {
    try {
      setSubmitError("");
      setSubmitSuccess("");
      setIsSubmitting(true);

      let uploadedPaymentProof: UploadedReferenceFile | null = null;
      const uploadedReferenceFiles: UploadedReferenceFile[] = [];

      /*
      * Upload do comprovante (caso exista)
      */
      if (paymentProofFile) {
        uploadedPaymentProof = await uploadFileToR2(
          paymentProofFile,
          "payment-proof"
        );
      }

      /*
      * Upload sequencial das referências
      */
      for (const file of referenceFiles) {
        try {
          const uploaded = await uploadFileToR2(file, "reference");
          uploadedReferenceFiles.push(uploaded);
        } catch (error) {
          throw new Error(
            `Erro ao enviar "${file.name}". ${
              error instanceof Error
                ? error.message
                : ""
            }`
          );
        }
      }

      const payload = {
        ...values,

        socialProfile: values.socialProfile || "",

        preferredContactMethodOther:
          values.preferredContactMethodOther || "",

        referralSourceOther:
          values.referralSourceOther || "",

        projectTypeOther:
          values.projectTypeOther || "",

        paymentMethodOther:
          values.paymentMethodOther || "",

        paymentProofUrl:
          uploadedPaymentProof?.url ?? null,

        paymentProofStorageKey:
          uploadedPaymentProof?.storageKey ?? null,

        referenceFilesJson: uploadedReferenceFiles,

        referenceFilesCount:
          uploadedReferenceFiles.length,
      };

      const response = await publicApiFetch(
        "/proposal-requests",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ??
            "Não foi possível enviar sua solicitação."
        );
      }

      sessionStorage.setItem(
        "proposalSent",
        "true"
      );

      setSubmitSuccess(
        "Solicitação enviada com sucesso. Recebemos seus dados e em instantes você será redirecionado."
      );

      setTimeout(() => {
        window.location.href =
          "/proposta-enviada";
      }, 1800);
    } catch (error) {
      console.error(error);

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

        {submitSuccess && (
          <SuccessBox>{submitSuccess}</SuccessBox>
        )}

        {fileWarning && (
          <WarningBox>{fileWarning}</WarningBox>
        )}

        {submitError && (
          <ErrorBox>{submitError}</ErrorBox>
        )}

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
