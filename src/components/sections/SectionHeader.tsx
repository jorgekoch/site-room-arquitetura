import styled from "styled-components";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

const Wrapper = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: 2rem;
  max-width: 760px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(184, 111, 82, 0.12);
  border: 1px solid rgba(184, 111, 82, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.05;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <Wrapper>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}