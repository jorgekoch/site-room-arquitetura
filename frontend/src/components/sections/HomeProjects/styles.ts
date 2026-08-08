import styled from "styled-components";

import { Link } from "react-router-dom";

import { media } from "../../../styles/breakpoints";

export const Section = styled.section`
  padding: 5rem 0;
`;

export const Container = styled.div`
  width: min(
    100% - 2rem,
    1200px
  );

  margin: 0 auto;

  @media ${media.tablet} {
    width: min(
      100% - 3rem,
      1200px
    );
  }
`;

export const Header = styled.div`
  max-width: 720px;

  margin-bottom: 2.5rem;
`;

export const Eyebrow = styled.span`
  display: block;

  margin-bottom: 0.6rem;

  color:
    ${({ theme }) =>
      theme.colors.primary};

  font-size:
    ${({ theme }) =>
      theme.fontSizes.xs};

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;
`;

export const Title = styled.h2`
  margin: 0 0 0.8rem;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size: 2rem;

  line-height: 1.15;
`;

export const Description = styled.p`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textSoft};

  line-height: 1.7;
`;

export const ConstructionCard = styled.div`
  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: 3rem;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  background:
    ${({ theme }) =>
      theme.colors.surface};

  box-shadow:
    ${({ theme }) =>
      theme.shadow.sm};
`;

export const ConstructionIcon = styled.div`
  width: 56px;

  height: 56px;

  display: grid;

  place-items: center;

  margin-bottom: 1.25rem;

  border-radius: 50%;

  background:
    ${({ theme }) =>
      theme.colors.primarySoft};

  color:
    ${({ theme }) =>
      theme.colors.primary};

  font-size: 1.5rem;
`;

export const ConstructionTitle = styled.h3`
  margin: 0 0 0.75rem;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size: 1.3rem;
`;

export const ConstructionText = styled.p`
  max-width: 520px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textSoft};

  line-height: 1.7;
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns:
      repeat(2, 1fr);
  }

  @media ${media.laptop} {
    grid-template-columns:
      repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  display: block;

  overflow: hidden;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  background:
    ${({ theme }) =>
      theme.colors.surface};

  text-decoration: none;

  transition:
    transform
    ${({ theme }) =>
      theme.transitions.default},
    box-shadow
    ${({ theme }) =>
      theme.transitions.default};

  &:hover {
    transform:
      translateY(-3px);

    box-shadow:
      ${({ theme }) =>
        theme.shadow.md};
  }
`;

export const Image = styled.img`
  width: 100%;

  height: 240px;

  display: block;

  object-fit: cover;
`;

export const ImagePlaceholder = styled.div`
  height: 240px;

  display: grid;

  place-items: center;

  background:
    ${({ theme }) =>
      theme.colors.backgroundSoft};

  color:
    ${({ theme }) =>
      theme.colors.textMuted};
`;

export const CardContent = styled.div`
  padding: 1.25rem;
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.4rem;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size: 1.1rem;
`;

export const CardLocation = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    ${({ theme }) =>
      theme.fontSizes.xs};
`;

export const ViewAll = styled(Link)`
  display: block;

  width: fit-content;

  margin:
    2rem auto 0;

  color:
    ${({ theme }) =>
      theme.colors.primary};

  font-weight: 700;

  text-decoration: none;
`;