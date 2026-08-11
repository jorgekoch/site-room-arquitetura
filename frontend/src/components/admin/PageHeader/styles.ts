import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 36px;

  gap: 24px;

  flex-wrap: wrap;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 3vw, 2.5rem);

  font-weight: 800;
  letter-spacing: -0.04em;

  color: ${({ theme }) => theme.colors.text};

  margin: 0;
`;

export const Description = styled.p`
  font-size: 0.95rem;

  color: ${({ theme }) => theme.colors.textSoft};

  margin: 0;

  max-width: 640px;

  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  flex-wrap: wrap;
`;
