import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValue } from "../../../schemas/proposalSchema";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  Textarea,
  ErrorText,
} from "../ProposalFields";

export function StepConsulting() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValue>();

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Consultoria / outros</StepTitle>
        <StepDescription>
          Descreva sua solicitação da maneira mais detalhada que puder.
        </StepDescription>
      </StepHeader>

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