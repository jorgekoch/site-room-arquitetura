import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  Textarea,
  ErrorText,
  Input,
} from "../ProposalFields";

export function StepConsulting() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const projectType = watch("projectType");

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Consultoria / outros</StepTitle>
        <StepDescription>
          Descreva sua solicitação da maneira mais detalhada que puder.
        </StepDescription>
      </StepHeader>

      {projectType === "other" && (
        <Field>
          <Label htmlFor="projectTypeOther">Qual é o outro tipo de projeto?</Label>
          <Input id="projectTypeOther" {...register("projectTypeOther")} />
          {errors.projectTypeOther && (
            <ErrorText>{String(errors.projectTypeOther.message)}</ErrorText>
          )}
        </Field>
      )}

      <Field>
        <Label htmlFor="consulting.requestDescription">Sua solicitação</Label>
        <Textarea
          id="consulting.requestDescription"
          placeholder="Explique o contexto, objetivo, o que você precisa e qualquer detalhe importante."
          {...register("consulting.requestDescription")}
        />
        {errors.consulting?.requestDescription && (
          <ErrorText>{String(errors.consulting.requestDescription.message)}</ErrorText>
        )}
      </Field>
    </StepWrapper>
  );
}