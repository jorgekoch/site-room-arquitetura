import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValue } from "../../../schemas/proposalSchema";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  ReviewBox,
  ReviewTitle,
  ReviewText,
  Divider,
} from "../ProposalFields";

export function StepReview() {
  const { getValues } = useFormContext<ProposalSchemaValue>();
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
        <ReviewTitle>Dados principais</ReviewTitle>
        <ReviewText><strong>Nome:</strong> {values.fullName || "-"}</ReviewText>
        <ReviewText><strong>E-mail:</strong> {values.email || "-"}</ReviewText>
        <ReviewText><strong>Telefone:</strong> {values.phone || "-"}</ReviewText>
        <ReviewText><strong>Tipo de projeto:</strong> {values.projectType || "-"}</ReviewText>
        <ReviewText><strong>Prazo desejado:</strong> {values.desiredWorkStart || "-"}</ReviewText>

        <Divider />

        {values.projectType === "new-construction" && (
          <>
            <ReviewTitle>Construção nova</ReviewTitle>
            <ReviewText>
              <strong>Terreno:</strong> {values.newConstruction.terrainSize || "-"}
            </ReviewText>
            <ReviewText>
              <strong>Inclinação:</strong> {values.newConstruction.terrainSlope || "-"}
            </ReviewText>
            <ReviewText>
              <strong>Endereço:</strong> {values.newConstruction.terrainAddress || "-"}
            </ReviewText>
          </>
        )}

        {values.projectType === "interiors" && (
          <>
            <ReviewTitle>Interiores</ReviewTitle>
            <ReviewText>
              <strong>Ambientes:</strong> {values.interiors.environments || "-"}
            </ReviewText>
            <ReviewText>
              <strong>Itens selecionados:</strong>{" "}
              {values.interiors.includedItems.length
                ? values.interiors.includedItems.join(", ")
                : "-"}
            </ReviewText>
          </>
        )}

        {values.projectType === "renovation" && (
          <>
            <ReviewTitle>Reforma / ampliação</ReviewTitle>
            <ReviewText>
              <strong>Descrição:</strong> {values.renovation.projectDescription || "-"}
            </ReviewText>
            <ReviewText>
              <strong>Endereço:</strong> {values.renovation.locationAddress || "-"}
            </ReviewText>
          </>
        )}

        {(values.projectType === "consulting" || values.projectType === "other") && (
          <>
            <ReviewTitle>Consultoria / outros</ReviewTitle>
            <ReviewText>
              <strong>Solicitação:</strong> {values.consulting.requestDescription || "-"}
            </ReviewText>
          </>
        )}

        <Divider />

        <ReviewTitle>Pagamento</ReviewTitle>
        <ReviewText>
          <strong>Método:</strong> {values.paymentMethod || "-"}
        </ReviewText>
        {values.paymentMethod === "outro" && (
          <ReviewText>
            <strong>Detalhe:</strong> {values.paymentMethodOther || "-"}
          </ReviewText>
        )}
      </ReviewBox>
    </StepWrapper>
  );
}