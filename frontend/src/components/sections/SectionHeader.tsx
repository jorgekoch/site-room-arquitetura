import styled from "styled-components";
import { media } from "../../styles/breakpoints";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

const Wrapper = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  width: 100%;
  max-width: none;

  @media ${media.tablet} {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
  width: 100%;
  max-width: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
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
