import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValue } from "../../../schemas/proposalSchema";
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

export function StepPayment() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProposalSchemaValue>();

  const paymentMethod = watch("paymentMethod");

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Taxa de solicitação</StepTitle>
        <StepDescription>
          Esta etapa confirma que você entendeu como funciona a taxa de solicitação e a forma de pagamento.
        </StepDescription>
      </StepHeader>

      <TermsBox>
        <HelperText>
          Cobramos uma taxa de <strong>R$80,00</strong> por solicitação de orçamento.
        </HelperText>

        <HelperText>
          Nessa taxa estão incluídos a elaboração manual da proposta de valores e uma reunião
          de 30 a 60 minutos com a arquiteta Manu para apresentação do escritório, serviços,
          etapas do projeto, prazos, entregas e esclarecimento de dúvidas.
        </HelperText>

        <HelperText>
          Caso o contrato seja fechado, esse valor é descontado do valor total do projeto.
        </HelperText>

        <HelperText>
          Obs. 1: o prazo de reembolso em caso de cancelamento é de 7 dias após a data da solicitação.
        </HelperText>

        <HelperText>
          Obs. 2: os valores podem ser ajustados caso, em conversa posterior, o escopo real seja diferente do inicialmente informado.
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

      {paymentMethod === "outro" && (
        <Field>
          <Label htmlFor="paymentMethodOther">Descreva a forma de pagamento</Label>
          <Input
            id="paymentMethodOther"
            {...register("paymentMethodOther")}
          />
          {errors.paymentMethodOther && (
            <ErrorText>{String(errors.paymentMethodOther.message)}</ErrorText>
          )}
        </Field>
      )}
    </StepWrapper>
  );
}