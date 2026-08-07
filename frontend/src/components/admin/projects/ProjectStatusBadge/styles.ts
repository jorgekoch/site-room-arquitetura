import styled from "styled-components";

export const Badge = styled.span<{
  $published: boolean;
}>`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: .75rem;

  font-weight: 600;

  background: ${({ theme, $published }) =>
    $published
      ? theme.colors.successSoft
      : theme.colors.secondarySoft};

  color: ${({ theme, $published }) =>
    $published
      ? theme.colors.success
      : theme.colors.secondary};
`;