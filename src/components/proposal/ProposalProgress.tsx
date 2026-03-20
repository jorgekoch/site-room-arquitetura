import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
`;

const Track = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  overflow: hidden;
`;

const Fill = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width ${({ theme }) => theme.transitions.default};
`;

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function ProposalProgress({ currentStep, totalSteps }: Props) {
  const width = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Wrapper>
      <Label>
        Etapa {currentStep + 1} de {totalSteps}
      </Label>
      <Track>
        <Fill $width={width} />
      </Track>
    </Wrapper>
  );
}