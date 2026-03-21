import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import { projectTypeOptions } from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  Input,
  Select,
  ErrorText,
} from "../ProposalFields";

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

export function StepProjectContext() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const projectType = watch("projectType");

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Contexto inicial</StepTitle>
        <StepDescription>
          Aqui a ROOM entende o tipo de projeto e o prazo desejado para seguir com a triagem.
        </StepDescription>
      </StepHeader>

      <Column>
        <Field>
          <Label htmlFor="desiredWorkStart">
            Qual o prazo desejado para início da sua obra?
          </Label>
          <Input
            id="desiredWorkStart"
            placeholder="Ex.: em 6 meses, no próximo ano, o quanto antes..."
            {...register("desiredWorkStart")}
          />
          {errors.desiredWorkStart && (
            <ErrorText>{String(errors.desiredWorkStart.message)}</ErrorText>
          )}
        </Field>

        <Field>
          <Label htmlFor="projectType">
            Qual o tipo de projeto que você quer orçar?
          </Label>
          <Select id="projectType" {...register("projectType")}>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.projectType && (
            <ErrorText>{String(errors.projectType.message)}</ErrorText>
          )}
        </Field>

        {projectType === "other" && (
          <Field>
            <Label htmlFor="projectTypeOther">
              Descreva o outro tipo de projeto
            </Label>
            <Input id="projectTypeOther" {...register("projectTypeOther")} />
            {errors.projectTypeOther && (
              <ErrorText>{String(errors.projectTypeOther.message)}</ErrorText>
            )}
          </Field>
        )}
      </Column>
    </StepWrapper>
  );
}