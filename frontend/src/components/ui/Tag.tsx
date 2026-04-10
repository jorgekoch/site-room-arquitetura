import styled from "styled-components";

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: fit-content;
  white-space: nowrap;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  line-height: 1;
`;
