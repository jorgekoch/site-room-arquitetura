import { useState } from "react";
import styled from "styled-components";

import {
  getProposalUploadUrl,
  saveProposalPaymentProof,
} from "../../lib/proposals";

const Wrapper = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const Input = styled.input`
  color: ${({ theme }) =>
    theme.colors.textSoft};
`;

const Button = styled.button`
  min-height: 42px;
  width: fit-content;

  padding: 0.7rem 1rem;

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  border: 0;

  background:
    ${({ theme }) =>
      theme.colors.primary};

  color:
    ${({ theme }) =>
      theme.colors.primaryContrast};

  font-weight: 700;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkView = styled.a`
  color:
    ${({ theme }) =>
      theme.colors.primary};

  text-decoration: none;

  font-weight: 600;
`;

const Message = styled.p<{
  $error?: boolean;
}>`
  color: ${({ theme, $error }) =>
    $error
      ? theme.colors.danger
      : theme.colors.success};

  line-height: 1.6;
`;

const Hint = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textSoft};

  font-size: 0.85rem;
`;

interface Props {
  proposalId: string;

  currentUrl?: string | null;

  onUploaded?: () => void;
}

export function ProposalPaymentProof({
  proposalId,
  currentUrl,
  onUploaded,
}: Props) {
  const [file, setFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleUpload() {
    if (!file) {
      setErrorMessage(
        "Selecione um arquivo."
      );

      return;
    }

    try {
      setUploading(true);

      setMessage("");
      setErrorMessage("");

      /**
       * 1. Solicita uma URL assinada
       */
      const upload =
        await getProposalUploadUrl({
          fileName: file.name,
          fileType:
            file.type as
              | "application/pdf"
              | "image/jpeg"
              | "image/png"
              | "image/webp",
          kind: "payment-proof",
        });

      /**
       * 2. Envia diretamente para o R2
       */
      const r2Response =
        await fetch(
          upload.uploadUrl,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                file.type,
            },
            body: file,
          }
        );

      if (!r2Response.ok) {
        throw new Error(
          "Não foi possível enviar o arquivo para o armazenamento."
        );
      }

      /**
       * 3. Registra a chave na proposta
       */
      await saveProposalPaymentProof(
        proposalId,
        upload.storageKey
      );

      setMessage(
        "Comprovante enviado com sucesso."
      );

      setFile(null);

      onUploaded?.();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao enviar comprovante."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Wrapper>
      <Title>
        Comprovante de pagamento
      </Title>

      {currentUrl ? (
        <LinkView
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ver comprovante atual
        </LinkView>
      ) : (
        <Hint>
          Nenhum comprovante enviado
          ainda.
        </Hint>
      )}

      <Input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        onChange={(event) =>
          setFile(
            event.target.files?.[0] ??
              null
          )
        }
      />

      {file && (
        <Hint>
          Arquivo selecionado:{" "}
          {file.name}
        </Hint>
      )}

      {message && (
        <Message>
          {message}
        </Message>
      )}

      {errorMessage && (
        <Message $error>
          {errorMessage}
        </Message>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading
          ? "Enviando..."
          : "Enviar comprovante"}
      </Button>
    </Wrapper>
  );
}