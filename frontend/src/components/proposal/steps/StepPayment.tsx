import styled from "styled-components";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import { paymentMethodOptions } from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Field,
  Label,
  ErrorText,
  TermsBox,
  HelperText,
  RadioGroup,
  RadioItem,
  Input,
  CheckboxItem,
} from "../ProposalFields";

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

const PixBox = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const PixKey = styled.code`
  display: block;
  padding: 0.9rem 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  word-break: break-all;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.8rem 1rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-weight: 600;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
  }
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

const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
`;

type Props = {
  pixKey: string;
  selectedProofFile: File | null;
  onSelectProofFile: (file: File | null) => void;
};

export function StepPayment({
  pixKey,
  selectedProofFile,
  onSelectProofFile,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const paymentMethod = watch("paymentMethod");
  const [copied, setCopied] = useState(false);

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function handlePickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    onSelectProofFile(file);
  }

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Reserva da análise do projeto</StepTitle>
        <StepDescription>
          Essa etapa garante a análise personalizada do seu projeto pela equipe
          da ROOM.
        </StepDescription>
      </StepHeader>

      <TermsBox>
        <HelperText>
          Cobramos uma taxa de <strong>R$80,00</strong> para dar início à
          análise da sua solicitação.
        </HelperText>

        <HelperText>
          Nessa etapa estão incluídos a elaboração manual da proposta de valores
          e uma reunião de 30 a 60 minutos com a arquiteta Manu.
        </HelperText>

        <HelperText>
          Caso o contrato seja fechado, esse valor é descontado do total do
          projeto.
        </HelperText>
      </TermsBox>

      <Field>
        <CheckboxItem>
          <input type="checkbox" {...register("taxAgreement")} />
          <span>Estou ciente e de acordo com os termos acima.</span>
        </CheckboxItem>

        {errors.taxAgreement && (
          <ErrorText>{String(errors.taxAgreement.message)}</ErrorText>
        )}
      </Field>

      <Column>
        <Field>
          <Label>Qual a melhor forma de pagamento da taxa para você?</Label>

          <RadioGroup>
            {paymentMethodOptions.map((option) => (
              <RadioItem key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  {...register("paymentMethod")}
                />
                <span>{option.label}</span>
              </RadioItem>
            ))}
          </RadioGroup>

          {errors.paymentMethod && (
            <ErrorText>{String(errors.paymentMethod.message)}</ErrorText>
          )}
        </Field>

        {paymentMethod === "pix" && (
          <PixBox>
            <div>
              <Label>Chave PIX</Label>
              <PixKey>{pixKey}</PixKey>
            </div>

            <ActionRow>
              <SmallButton type="button" onClick={handleCopyPix}>
                {copied ? "Chave copiada" : "Copiar chave PIX"}
              </SmallButton>

              <UploadLabel htmlFor="payment-proof-file">
                Enviar comprovante
              </UploadLabel>

              <HiddenInput
                id="payment-proof-file"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handlePickFile}
              />
            </ActionRow>

            <HelperText>
              Após o pagamento, envie o comprovante para priorizar sua análise.
            </HelperText>

            {selectedProofFile && (
              <FileName>📎 Arquivo selecionado: {selectedProofFile.name}</FileName>
            )}
          </PixBox>
        )}

        {paymentMethod === "outro" && (
          <Field>
            <Label htmlFor="paymentMethodOther">
              Descreva a forma de pagamento
            </Label>
            <Input id="paymentMethodOther" {...register("paymentMethodOther")} />

            {errors.paymentMethodOther && (
              <ErrorText>{String(errors.paymentMethodOther.message)}</ErrorText>
            )}
          </Field>
        )}
      </Column>
    </StepWrapper>
  );
}