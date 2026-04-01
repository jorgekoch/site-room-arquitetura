import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import { projectModeOptions } from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  Textarea,
  Input,
  ErrorText,
  RadioGroup,
  RadioItem,
  HelperText,
} from "../ProposalFields";

const UploadBox = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const UploadActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FilesList = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.8rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
  word-break: break-word;
`;

const RemoveButton = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 0.85rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryContrast};
  font-weight: 600;
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
  }
`;

type Props = {
  referenceFiles: File[];
  onAddReferenceFiles: (files: File[]) => void;
  onRemoveReferenceFile: (index: number) => void;
};

export function StepRenovation({
  referenceFiles,
  onAddReferenceFiles,
  onRemoveReferenceFile,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  function handlePickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    onAddReferenceFiles(files);
    event.target.value = "";
  }

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto arquitetônico — reforma e/ou ampliação</StepTitle>
        <StepDescription>
          Seja específico. O objetivo aqui é entender a mudança desejada, o que já
          existe e o que precisa evoluir.
        </StepDescription>
      </StepHeader>

      <Field>
        <Label htmlFor="renovation.projectDescription">
          Faça uma descrição detalhada do seu projeto
        </Label>
        <Textarea
          id="renovation.projectDescription"
          placeholder="Ex.: quero ampliar a área social, integrar cozinha e salas, criar novas suítes..."
          {...register("renovation.projectDescription")}
        />
        {errors.renovation?.projectDescription && (
          <ErrorText>{String(errors.renovation.projectDescription.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label htmlFor="renovation.locationAddress">
          Endereço do local ou link do Google Maps
        </Label>
        <Input
          id="renovation.locationAddress"
          {...register("renovation.locationAddress")}
        />
        {errors.renovation?.locationAddress && (
          <ErrorText>{String(errors.renovation.locationAddress.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label htmlFor="renovation.referencesLinks">
          Links de fotos, vídeos e referências
        </Label>
        <Textarea
          id="renovation.referencesLinks"
          placeholder="Cole aqui links do Google Drive, Pinterest, vídeos, referências visuais ou materiais já organizados."
          {...register("renovation.referencesLinks")}
        />
        {errors.renovation?.referencesLinks && (
          <ErrorText>{String(errors.renovation.referencesLinks.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label>Arquivos de referência do projeto</Label>

        <UploadBox>
          <HelperText>
            Você também pode enviar fotos, imagens, PDFs ou materiais de apoio
            diretamente por aqui.
          </HelperText>

          <UploadActions>
            <UploadLabel htmlFor="renovation-reference-files">
              Adicionar arquivos
            </UploadLabel>

            <HiddenInput
              id="renovation-reference-files"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              multiple
              onChange={handlePickFiles}
            />
          </UploadActions>

          {!!referenceFiles.length && (
            <FilesList>
              {referenceFiles.map((file, index) => (
                <FileItem key={`${file.name}-${file.size}-${index}`}>
                  <FileName>📎 {file.name}</FileName>

                  <RemoveButton
                    type="button"
                    onClick={() => onRemoveReferenceFile(index)}
                  >
                    Remover
                  </RemoveButton>
                </FileItem>
              ))}
            </FilesList>
          )}
        </UploadBox>
      </Field>

      <Field>
        <Label htmlFor="renovation.observations">Observações adicionais</Label>
        <Textarea
          id="renovation.observations"
          {...register("renovation.observations")}
        />
      </Field>

      <Field>
        <Label>Você quer fazer esse projeto de forma presencial ou online?</Label>
        <RadioGroup>
          {projectModeOptions.map((option) => (
            <RadioItem key={option.value}>
              <input
                type="radio"
                value={option.value}
                {...register("renovation.projectMode")}
              />
              <span>{option.label}</span>
            </RadioItem>
          ))}
        </RadioGroup>
        {errors.renovation?.projectMode && (
          <ErrorText>{String(errors.renovation.projectMode.message)}</ErrorText>
        )}
      </Field>
    </StepWrapper>
  );
}