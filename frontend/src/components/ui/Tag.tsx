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
  background: rgba(184, 111, 82, 0.12);
  border: 1px solid rgba(184, 111, 82, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  line-height: 1;
`;