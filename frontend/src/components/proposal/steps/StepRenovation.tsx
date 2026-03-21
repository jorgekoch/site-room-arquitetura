import { useFormContext } from "react-hook-form";
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
} from "../ProposalFields";

export function StepRenovation() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Projeto arquitetônico — reforma e/ou ampliação</StepTitle>
        <StepDescription>
          Seja específico. O objetivo aqui é entender a mudança desejada, o que já existe e o que precisa evoluir.
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
          placeholder="Fotos do terreno/edificação existente, referências de linguagem, pastas do Pinterest ou Drive..."
          {...register("renovation.referencesLinks")}
        />
        {errors.renovation?.referencesLinks && (
          <ErrorText>{String(errors.renovation.referencesLinks.message)}</ErrorText>
        )}
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