import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  ReviewBox,
  ReviewTitle,
  ReviewText,
  Divider,
  Field,
  ErrorText,
  CheckboxItem,
} from "../ProposalFields";

function renderValue(value: string | undefined | null) {
  if (!value || !String(value).trim()) return "-";
  return value;
}

function renderArray(values: string[] | undefined) {
  if (!values || !values.length) return "-";
  return values.join(", ");
}

export function StepReview() {
  const {
    getValues,
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const values = getValues();

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Revisão final</StepTitle>
        <StepDescription>
          Confira as informações antes de enviar sua solicitação.
        </StepDescription>
      </StepHeader>

      <ReviewBox>
        <ReviewTitle>Dados pessoais</ReviewTitle>
        <ReviewText><strong>Nome:</strong> {renderValue(values.fullName)}</ReviewText>
        <ReviewText><strong>E-mail:</strong> {renderValue(values.email)}</ReviewText>
        <ReviewText><strong>CPF:</strong> {renderValue(values.cpf)}</ReviewText>
        <ReviewText><strong>Data de nascimento:</strong> {renderValue(values.birthDate)}</ReviewText>
        <ReviewText><strong>Telefone:</strong> {renderValue(values.phone)}</ReviewText>
        <ReviewText><strong>Endereço:</strong> {renderValue(values.address)}</ReviewText>
        <ReviewText><strong>Rede social:</strong> {renderValue(values.socialProfile)}</ReviewText>
        <ReviewText>
          <strong>Melhor meio de contato:</strong>{" "}
          {renderValue(values.preferredContactMethod)}
          {values.preferredContactMethod === "outro" &&
          values.preferredContactMethodOther
            ? ` — ${values.preferredContactMethodOther}`
            : ""}
        </ReviewText>
        <ReviewText>
          <strong>Como conheceu a ROOM:</strong>{" "}
          {renderValue(values.referralSource)}
          {values.referralSource === "outro" && values.referralSourceOther
            ? ` — ${values.referralSourceOther}`
            : ""}
        </ReviewText>

        <Divider />

        <ReviewTitle>Contexto inicial</ReviewTitle>
        <ReviewText>
          <strong>Prazo desejado:</strong> {renderValue(values.desiredWorkStart)}
        </ReviewText>
        <ReviewText>
          <strong>Tipo de projeto:</strong> {renderValue(values.projectType)}
          {values.projectType === "other" && values.projectTypeOther
            ? ` — ${values.projectTypeOther}`
            : ""}
        </ReviewText>

        <Divider />

        {values.projectType === "new-construction" && (
          <>
            <ReviewTitle>Projeto arquitetônico — construção nova</ReviewTitle>
            <ReviewText>
              <strong>Tamanho do terreno:</strong>{" "}
              {renderValue(values.newConstruction.terrainSize)}
            </ReviewText>
            <ReviewText>
              <strong>Inclinação:</strong>{" "}
              {renderValue(values.newConstruction.terrainSlope)}
              {values.newConstruction.terrainSlope === "outro" &&
              values.newConstruction.terrainSlopeOther
                ? ` — ${values.newConstruction.terrainSlopeOther}`
                : ""}
            </ReviewText>
            <ReviewText>
              <strong>Zona do terreno:</strong>{" "}
              {renderValue(values.newConstruction.terrainZone)}
              {values.newConstruction.terrainZone === "outro" &&
              values.newConstruction.terrainZoneOther
                ? ` — ${values.newConstruction.terrainZoneOther}`
                : ""}
            </ReviewText>
            <ReviewText>
              <strong>Endereço do terreno:</strong>{" "}
              {renderValue(values.newConstruction.terrainAddress)}
            </ReviewText>
            <ReviewText>
              <strong>Escopo do projeto:</strong>{" "}
              {renderValue(values.newConstruction.scopeDescription)}
            </ReviewText>
            <ReviewText>
              <strong>Pavimentos:</strong>{" "}
              {renderValue(values.newConstruction.floors)}
              {values.newConstruction.floors === "outro" &&
              values.newConstruction.floorsOther
                ? ` — ${values.newConstruction.floorsOther}`
                : ""}
            </ReviewText>
            <ReviewText>
              <strong>Metragem desejada:</strong>{" "}
              {renderValue(values.newConstruction.desiredArea)}
            </ReviewText>
            <ReviewText>
              <strong>Orçamento definido:</strong>{" "}
              {renderValue(values.newConstruction.definedBudget)}
            </ReviewText>
            <ReviewText>
              <strong>Parceria de engenharia:</strong>{" "}
              {renderValue(values.newConstruction.wantsEngineeringPartnership)}
            </ReviewText>
            <ReviewText>
              <strong>Links de referência:</strong>{" "}
              {renderValue(values.newConstruction.referencesLinks)}
            </ReviewText>
            <ReviewText>
              <strong>Observações:</strong>{" "}
              {renderValue(values.newConstruction.observations)}
            </ReviewText>
            <ReviewText>
              <strong>Modalidade:</strong>{" "}
              {renderValue(values.newConstruction.projectMode)}
            </ReviewText>
            <Divider />
          </>
        )}

        {values.projectType === "interiors" && (
          <>
            <ReviewTitle>Projeto de interiores</ReviewTitle>
            <ReviewText>
              <strong>Itens inclusos:</strong>{" "}
              {renderArray(values.interiors.includedItems)}
              {values.interiors.includedItems.includes("outro") &&
              values.interiors.includedItemsOther
                ? ` — ${values.interiors.includedItemsOther}`
                : ""}
            </ReviewText>
            <ReviewText>
              <strong>Ambientes:</strong>{" "}
              {renderValue(values.interiors.environments)}
            </ReviewText>
            <ReviewText>
              <strong>Links de referência:</strong>{" "}
              {renderValue(values.interiors.referencesLinks)}
            </ReviewText>
            <ReviewText>
              <strong>Observações:</strong>{" "}
              {renderValue(values.interiors.observations)}
            </ReviewText>
            <ReviewText>
              <strong>Modalidade:</strong>{" "}
              {renderValue(values.interiors.projectMode)}
            </ReviewText>
            <Divider />
          </>
        )}

        {values.projectType === "renovation" && (
          <>
            <ReviewTitle>Reforma / ampliação</ReviewTitle>
            <ReviewText>
              <strong>Descrição:</strong>{" "}
              {renderValue(values.renovation.projectDescription)}
            </ReviewText>
            <ReviewText>
              <strong>Endereço do local:</strong>{" "}
              {renderValue(values.renovation.locationAddress)}
            </ReviewText>
            <ReviewText>
              <strong>Links de referência:</strong>{" "}
              {renderValue(values.renovation.referencesLinks)}
            </ReviewText>
            <ReviewText>
              <strong>Observações:</strong>{" "}
              {renderValue(values.renovation.observations)}
            </ReviewText>
            <ReviewText>
              <strong>Modalidade:</strong>{" "}
              {renderValue(values.renovation.projectMode)}
            </ReviewText>
            <Divider />
          </>
        )}

        {(values.projectType === "consulting" || values.projectType === "other") && (
          <>
            <ReviewTitle>Consultoria / outros</ReviewTitle>
            <ReviewText>
              <strong>Solicitação:</strong>{" "}
              {renderValue(values.consulting.requestDescription)}
            </ReviewText>
            <Divider />
          </>
        )}

        <ReviewTitle>Pagamento</ReviewTitle>
        <ReviewText>
          <strong>Aceite da taxa:</strong> {values.taxAgreement ? "Sim" : "Não"}
        </ReviewText>
        <ReviewText>
          <strong>Forma de pagamento:</strong>{" "}
          {renderValue(values.paymentMethod)}
          {values.paymentMethod === "outro" && values.paymentMethodOther
            ? ` — ${values.paymentMethodOther}`
            : ""}
        </ReviewText>
      </ReviewBox>

      <Field>
        <CheckboxItem>
          <input type="checkbox" {...register("reviewConfirmed")} />
          <span>Li e confirmo que os dados estão corretos.</span>
        </CheckboxItem>
        {errors.reviewConfirmed && (
          <ErrorText>{String(errors.reviewConfirmed.message)}</ErrorText>
        )}
      </Field>
    </StepWrapper>
  );
}