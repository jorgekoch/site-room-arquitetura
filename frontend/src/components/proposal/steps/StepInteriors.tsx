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
} from "../ProposalFields";

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

export function StepInteriors() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const includedItems = watch("interiors.includedItems");
  const hasOther = includedItems.includes("outro");

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto de interiores</StepTitle>
        <StepDescription>
          Aqui a ROOM entende o escopo do ambiente e o nível de detalhamento esperado para a proposta.
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