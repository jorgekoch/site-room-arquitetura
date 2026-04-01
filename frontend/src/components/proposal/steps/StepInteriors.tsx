import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import type { InteriorsScopeOption } from "../../../types/proposal";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import {
  interiorsScopeOptions,
  projectModeOptions,
} from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  Textarea,
  ErrorText,
  CheckboxGroup,
  CheckboxItem,
  Input,
  RadioGroup,
  RadioItem,
  HelperText,
} from "../ProposalFields";

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

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

export function StepInteriors({
  referenceFiles,
  onAddReferenceFiles,
  onRemoveReferenceFile,
}: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const includedItems = watch("interiors.includedItems");
  const hasOther = includedItems.includes("outro");

  function handlePickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    onAddReferenceFiles(files);
    event.target.value = "";
  }

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto de interiores</StepTitle>
        <StepDescription>
          Aqui a ROOM entende o escopo do ambiente e o nível de detalhamento
          esperado para a proposta.
        </StepDescription>
      </StepHeader>

      <Column>
        <Field>
          <Label>O que deve estar incluso na proposta?</Label>

          <Controller
            control={control}
            name="interiors.includedItems"
            render={({ field }) => {
              const selectedValues = field.value || [];

              function toggleValue(value: InteriorsScopeOption) {
                if (selectedValues.includes(value)) {
                  field.onChange(selectedValues.filter((item) => item !== value));
                  return;
                }

                field.onChange([...selectedValues, value]);
              }

              return (
                <CheckboxGroup>
                  {interiorsScopeOptions.map((option) => (
                    <CheckboxItem key={option.value}>
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={() => toggleValue(option.value)}
                      />
                      <span>{option.label}</span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              );
            }}
          />

          {errors.interiors?.includedItems && (
            <ErrorText>{String(errors.interiors.includedItems.message)}</ErrorText>
          )}
        </Field>

        {hasOther && (
          <Field>
            <Label htmlFor="interiors.includedItemsOther">
              Descreva o outro item
            </Label>
            <Input
              id="interiors.includedItemsOther"
              {...register("interiors.includedItemsOther")}
            />
            {errors.interiors?.includedItemsOther && (
              <ErrorText>{String(errors.interiors.includedItemsOther.message)}</ErrorText>
            )}
          </Field>
        )}
      </Column>

      <Field>
        <Label htmlFor="interiors.environments">
          Quais os ambientes a serem projetados?
        </Label>
        <Textarea
          id="interiors.environments"
          placeholder="Ex.: sala, cozinha, suíte, varanda gourmet..."
          {...register("interiors.environments")}
        />
        {errors.interiors?.environments && (
          <ErrorText>{String(errors.interiors.environments.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label htmlFor="interiors.referencesLinks">
          Links de fotos, vídeos e referências
        </Label>
        <Textarea
          id="interiors.referencesLinks"
          placeholder="Pinterest, Google Drive, fotos do local, referências de estilo..."
          {...register("interiors.referencesLinks")}
        />
        {errors.interiors?.referencesLinks && (
          <ErrorText>{String(errors.interiors.referencesLinks.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label>Arquivos de referência do projeto</Label>

        <UploadBox>
          <HelperText>
            Você também pode enviar fotos do local, referências de estilo,
            imagens e PDFs diretamente por aqui.
          </HelperText>

          <UploadActions>
            <UploadLabel htmlFor="interiors-reference-files">
              Adicionar arquivos
            </UploadLabel>

            <HiddenInput
              id="interiors-reference-files"
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
        <Label htmlFor="interiors.observations">Observações adicionais</Label>
        <Textarea
          id="interiors.observations"
          {...register("interiors.observations")}
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
                {...register("interiors.projectMode")}
              />
              <span>{option.label}</span>
            </RadioItem>
          ))}
        </RadioGroup>
        {errors.interiors?.projectMode && (
          <ErrorText>{String(errors.interiors.projectMode.message)}</ErrorText>
        )}
      </Field>
    </StepWrapper>
  );
}