import type { ReactNode } from "react";

import * as S from "./styles";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
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

        <S.Actions>
          <S.CancelButton
            type="button"
            onClick={onCancel}
            disabled={loading}
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