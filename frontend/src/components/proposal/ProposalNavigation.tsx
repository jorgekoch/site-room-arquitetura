import styled from "styled-components";
import { Button } from "../ui/Button";

const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

type Props = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmitStep: () => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
};

export function ProposalNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmitStep,
  isSubmitting = false,
  isSubmitDisabled = false,
}: Props) {
  const isLast = currentStep === totalSteps - 1;

  return (
    <Wrapper>
      <div>
        {currentStep > 0 && (
          <Button type="button" variant="ghost" onClick={onBack}>
            Voltar etapa
          </Button>
        )}
      </div>

      <div>
        {isLast ? (
          <Button
            type="button"
            disabled={isSubmitting || isSubmitDisabled}
            onClick={onSubmitStep}
          >
            {isSubmitting ? "Enviando..." : "Enviar solicitação"}
          </Button>
        ) : (
          <Button type="button" onClick={onNext}>
            Continuar
          </Button>
        )}
      </div>
    </Wrapper>
  );
}