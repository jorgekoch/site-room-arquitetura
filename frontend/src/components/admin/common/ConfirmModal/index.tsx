import type { ReactNode } from "react";

import * as S from "./styles";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  confirmation?: {
    value: string;
    onChange: (value: string) => void;
    phrase?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  confirmation,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <S.Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onCancel();
        }
      }}
    >
      <S.Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <S.Title id="confirm-modal-title">
          {title}
        </S.Title>

        <S.Message>
          {message}
        </S.Message>

        {confirmation && (
          <S.ConfirmationInput
            autoFocus
            value={confirmation.value}
            onChange={(event) =>
              confirmation.onChange(event.target.value)
            }
            placeholder={`Digite \"${confirmation.phrase ?? "excluir"}\"`}
            disabled={loading}
          />
        )}

        <S.Actions>
          <S.CancelButton
            type="button"
            onClick={onCancel}
            disabled={
              loading ||
              (confirmation &&
                confirmation.value !==
                  (confirmation.phrase ?? "excluir"))
            }
          >
            {cancelLabel}
          </S.CancelButton>

          <S.ConfirmButton
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Removendo..."
              : confirmLabel}
          </S.ConfirmButton>
        </S.Actions>
      </S.Dialog>
    </S.Overlay>
  );
}
