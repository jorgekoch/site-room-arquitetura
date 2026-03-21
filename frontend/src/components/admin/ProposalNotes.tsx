import { useState } from "react";
import styled from "styled-components";
import { apiFetch } from "../../lib/api";

const Wrapper = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  resize: vertical;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
`;

const Button = styled.button`
  min-height: 42px;
  width: fit-content;
  padding: 0.7rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-weight: 700;
  cursor: pointer;
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
`;

export function ProposalNotes({
  proposalId,
  initialValue,
  onSaved,
  onUnauthorized,
}: {
  proposalId: string;
  initialValue?: string | null;
  onSaved?: () => void;
  onUnauthorized?: () => void;
}) {
  const [value, setValue] = useState(initialValue || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSave() {
    try {
      setSaving(true);
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch(`/proposal-requests/${proposalId}/notes`, {
        method: "PATCH",
        body: JSON.stringify({ internalNotes: value }),
      });

      if (response.status === 401) {
        onUnauthorized?.();
        return;
      }

      if (!response.ok) {
        throw new Error("Não foi possível salvar as notas.");
      }

      setMessage("Notas salvas com sucesso.");
      onSaved?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao salvar notas."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Wrapper>
      <Title>Notas internas</Title>

      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Use este espaço para registrar observações internas da equipe."
      />

      {message && <Message>{message}</Message>}
      {errorMessage && <Message $error>{errorMessage}</Message>}

      <Button type="button" onClick={handleSave} disabled={saving}>
        {saving ? "Salvando..." : "Salvar notas"}
      </Button>
    </Wrapper>
  );
}