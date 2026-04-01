import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import {
  floorsOptions,
  projectModeOptions,
  terrainSlopeOptions,
  terrainZoneOptions,
} from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Inline,
  Field,
  Label,
  Input,
  Select,
  Textarea,
  ErrorText,
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

export function StepNewConstruction({
  referenceFiles,
  onAddReferenceFiles,
  onRemoveReferenceFile,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const terrainSlope = watch("newConstruction.terrainSlope");
  const terrainZone = watch("newConstruction.terrainZone");
  const floors = watch("newConstruction.floors");

  function handlePickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    onAddReferenceFiles(files);
    event.target.value = "";
  }

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto arquitetônico — construção nova</StepTitle>
        <StepDescription>
          Quanto mais específico você for aqui, melhor a ROOM consegue entender
          o contexto e preparar a proposta.
        </StepDescription>
      </StepHeader>

      <Field>
        <Label htmlFor="newConstruction.terrainSize">
          Qual o tamanho do seu terreno? Com medidas e área.
        </Label>
        <Input
          id="newConstruction.terrainSize"
          placeholder="Ex.: 15 x 30m | 450m²"
          {...register("newConstruction.terrainSize")}
        />
        {errors.newConstruction?.terrainSize && (
          <ErrorText>{String(errors.newConstruction.terrainSize.message)}</ErrorText>
        )}
      </Field>

      <Inline>
        <Column>
          <Field>
            <Label htmlFor="newConstruction.terrainSlope">
              Seu terreno é plano ou inclinado?
            </Label>
            <Select
              id="newConstruction.terrainSlope"
              {...register("newConstruction.terrainSlope")}
            >
              <option value="">Selecione</option>
              {terrainSlopeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.newConstruction?.terrainSlope && (
              <ErrorText>{String(errors.newConstruction.terrainSlope.message)}</ErrorText>
            )}
          </Field>

          {terrainSlope === "outro" && (
            <Field>
              <Label htmlFor="newConstruction.terrainSlopeOther">
                Descreva a inclinação do terreno
              </Label>
              <Input
                id="newConstruction.terrainSlopeOther"
                {...register("newConstruction.terrainSlopeOther")}
              />
              {errors.newConstruction?.terrainSlopeOther && (
                <ErrorText>
                  {String(errors.newConstruction.terrainSlopeOther.message)}
                </ErrorText>
              )}
            </Field>
          )}
        </Column>

        <Column>
          <Field>
            <Label htmlFor="newConstruction.terrainZone">
              Seu terreno é rural ou urbano?
            </Label>
            <Select
              id="newConstruction.terrainZone"
              {...register("newConstruction.terrainZone")}
            >
              <option value="">Selecione</option>
              {terrainZoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.newConstruction?.terrainZone && (
              <ErrorText>{String(errors.newConstruction.terrainZone.message)}</ErrorText>
            )}
          </Field>

          {terrainZone === "outro" && (
            <Field>
              <Label htmlFor="newConstruction.terrainZoneOther">
                Descreva a classificação do terreno
              </Label>
              <Input
                id="newConstruction.terrainZoneOther"
                {...register("newConstruction.terrainZoneOther")}
              />
              {errors.newConstruction?.terrainZoneOther && (
                <ErrorText>
                  {String(errors.newConstruction.terrainZoneOther.message)}
                </ErrorText>
              )}
            </Field>
          )}
        </Column>
      </Inline>

      <Field>
        <Label htmlFor="newConstruction.terrainAddress">
          Endereço do terreno ou link do Google Maps
        </Label>
        <Input
          id="newConstruction.terrainAddress"
          {...register("newConstruction.terrainAddress")}
        />
        {errors.newConstruction?.terrainAddress && (
          <ErrorText>{String(errors.newConstruction.terrainAddress.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label htmlFor="newConstruction.scopeDescription">
          Liste o escopo do projeto (cômodos, necessidades, desejos)
        </Label>
        <Textarea
          id="newConstruction.scopeDescription"
          placeholder="Descreva a casa, os ambientes, a atmosfera desejada, referências, necessidades práticas e tudo o que for importante."
          {...register("newConstruction.scopeDescription")}
        />
        {errors.newConstruction?.scopeDescription && (
          <ErrorText>{String(errors.newConstruction.scopeDescription.message)}</ErrorText>
        )}
      </Field>

      <Column>
        <Field>
          <Label htmlFor="newConstruction.floors">
            Quantos pavimentos a construção terá?
          </Label>
          <Select
            id="newConstruction.floors"
            {...register("newConstruction.floors")}
          >
            <option value="">Selecione</option>
            {floorsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.newConstruction?.floors && (
            <ErrorText>{String(errors.newConstruction.floors.message)}</ErrorText>
          )}
        </Field>

        {floors === "outro" && (
          <Field>
            <Label htmlFor="newConstruction.floorsOther">
              Descreva a outra opção de pavimentos
            </Label>
            <Input
              id="newConstruction.floorsOther"
              {...register("newConstruction.floorsOther")}
            />
            {errors.newConstruction?.floorsOther && (
              <ErrorText>{String(errors.newConstruction.floorsOther.message)}</ErrorText>
            )}
          </Field>
        )}
      </Column>

      <Inline>
        <Field>
          <Label htmlFor="newConstruction.desiredArea">
            Metragem quadrada desejada (se já souber)
          </Label>
          <Input
            id="newConstruction.desiredArea"
            placeholder="Ex.: 180m²"
            {...register("newConstruction.desiredArea")}
          />
        </Field>

        <Field>
          <Label htmlFor="newConstruction.definedBudget">
            Você já tem orçamento definido?
          </Label>
          <Input
            id="newConstruction.definedBudget"
            placeholder="Ex.: até 800 mil para a obra"
            {...register("newConstruction.definedBudget")}
          />
        </Field>
      </Inline>

      <Field>
        <Label>
          Você gostaria que a parceria de engenharia fizesse parte do projeto?
        </Label>
        <RadioGroup>
          <RadioItem>
            <input
              type="radio"
              value="nao"
              {...register("newConstruction.wantsEngineeringPartnership")}
            />
            <span>
              Não, já tenho equipe/profissional em vista ou quero apenas
              orçamento para o Projeto Arquitetônico.
            </span>
          </RadioItem>

          <RadioItem>
            <input
              type="radio"
              value="sim"
              {...register("newConstruction.wantsEngineeringPartnership")}
            />
            <span>Sim, gostaria de um orçamento incluindo todos os projetos.</span>
          </RadioItem>
        </RadioGroup>
        {errors.newConstruction?.wantsEngineeringPartnership && (
          <ErrorText>
            {String(errors.newConstruction.wantsEngineeringPartnership.message)}
          </ErrorText>
        )}
      </Field>

      <Field>
        <Label htmlFor="newConstruction.referencesLinks">
          Links de fotos, vídeos do terreno e referências
        </Label>
        <Textarea
          id="newConstruction.referencesLinks"
          placeholder="Pode ser Pinterest, Google Drive, Instagram, YouTube, etc."
          {...register("newConstruction.referencesLinks")}
        />
        {errors.newConstruction?.referencesLinks && (
          <ErrorText>{String(errors.newConstruction.referencesLinks.message)}</ErrorText>
        )}
      </Field>

      <Field>
        <Label>Arquivos de referência do projeto</Label>

        <UploadBox>
          <HelperText>
            Você também pode enviar fotos do terreno, imagens de referência,
            PDFs ou materiais de apoio diretamente por aqui.
          </HelperText>

          <UploadActions>
            <UploadLabel htmlFor="new-construction-reference-files">
              Adicionar arquivos
            </UploadLabel>

            <HiddenInput
              id="new-construction-reference-files"
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
        <Label htmlFor="newConstruction.observations">Observações adicionais</Label>
        <Textarea
          id="newConstruction.observations"
          placeholder="Qualquer informação relevante para a proposta."
          {...register("newConstruction.observations")}
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
                {...register("newConstruction.projectMode")}
              />
              <span>{option.label}</span>
            </RadioItem>
          ))}
        </RadioGroup>
        {errors.newConstruction?.projectMode && (
          <ErrorText>{String(errors.newConstruction.projectMode.message)}</ErrorText>
        )}
      </Field>
    </StepWrapper>
  );
}