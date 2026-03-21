import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  min-height: 34px;
  padding: 0.5rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export function CopyButton({
  label = "Copiar",
  value,
}: {
  label?: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return <Button onClick={handleCopy}>{copied ? "Copiado!" : label}</Button>;
}