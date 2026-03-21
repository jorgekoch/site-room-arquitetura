import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValue } from "../../../schemas/proposalSchema";
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
} from "../ProposalFields";

export function StepNewConstruction() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValue>();

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto arquitetônico — construção nova</StepTitle>
        <StepDescription>
          Quanto mais específico você for aqui, melhor a ROOM consegue entender o contexto e preparar a proposta.
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
        <Field>
          <Label htmlFor="newConstruction.terrainSlope">Seu terreno é plano ou inclinado?</Label>
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

        <Field>
          <Label htmlFor="newConstruction.terrainZone">Seu terreno é rural ou urbano?</Label>
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

      <Field>
        <Label htmlFor="newConstruction.floors">Quantos pavimentos a construção terá?</Label>
        <Select id="newConstruction.floors" {...register("newConstruction.floors")}>
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

      <Inline>
        <Field>
          <Label htmlFor="newConstruction.desiredArea">Metragem quadrada desejada (se já souber)</Label>
          <Input
            id="newConstruction.desiredArea"
            placeholder="Ex.: 180m²"
            {...register("newConstruction.desiredArea")}
          />
        </Field>

        <Field>
          <Label htmlFor="newConstruction.definedBudget">Você já tem orçamento definido?</Label>
          <Input
            id="newConstruction.definedBudget"
            placeholder="Ex.: até 800 mil para a obra"
            {...register("newConstruction.definedBudget")}
          />
        </Field>
      </Inline>

      <Field>
        <Label>Você gostaria que a parceria de engenharia fizesse parte do projeto?</Label>
        <RadioGroup>
          <RadioItem>
            <input
              type="radio"
              value="nao"
              {...register("newConstruction.wantsEngineeringPartnership")}
            />
            <span>
              Não, já tenho equipe/profissional em vista ou quero apenas orçamento para o Projeto Arquitetônico.
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