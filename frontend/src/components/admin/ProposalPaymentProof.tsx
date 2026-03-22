import { useState } from "react";
import styled from "styled-components";
import { getAdminToken } from "../../lib/auth";
import { apiFetch } from "../../lib/api";

const Wrapper = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const Input = styled.input`
  color: ${({ theme }) => theme.colors.textSoft};
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

const LinkView = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
`;

export function ProposalPaymentProof({
  proposalId,
  currentUrl,
  onUploaded,
  onUnauthorized,
}: {
  proposalId: string;
  currentUrl?: string | null;
  onUploaded?: () => void;
  onUnauthorized?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      setErrorMessage("Selecione um arquivo.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setErrorMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const token = getAdminToken();

      const response = await apiFetch(`/proposal-requests/${proposalId}/payment-proof`,
        {
          method: "POST",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          body: formData,
        }
      );

      if (response.status === 401) {
        onUnauthorized?.();
        return;
      }

      if (!response.ok) {
        throw new Error("Não foi possível enviar o comprovante.");
      }

      setMessage("Comprovante enviado com sucesso.");
      setFile(null);
      onUploaded?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao enviar comprovante."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Wrapper>
      <Title>Comprovante de pagamento</Title>

      {currentUrl ? (
        <LinkView href={currentUrl} target="_blank" rel="noreferrer">
          Ver comprovante atual
        </LinkView>
      ) : (
        <span>Nenhum comprovante enviado ainda.</span>
      )}

      <Input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        onChange={(event) => setFile(event.target.files?.[0] || null)}
      />

      {message && <Message>{message}</Message>}
      {errorMessage && <Message $error>{errorMessage}</Message>}

      <Button type="button" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Enviando..." : "Enviar comprovante"}
      </Button>
    </Wrapper>
  );
}