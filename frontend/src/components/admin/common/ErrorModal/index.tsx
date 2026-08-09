import type { ReactNode } from "react";

import * as S from "./styles";

type ErrorModalProps = {
  open: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
};

export function ErrorModal({
  open,
  title = "Não foi possível realizar a ação",
  message,
  onClose,
}: ErrorModalProps) {
  if (!open) {
    return null;
  }

  return (
    <S.Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <S.Dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
      >
        <S.Icon aria-hidden="true">
          !
        </S.Icon>

        <S.Title id="error-modal-title">
          {title}
        </S.Title>

        <S.Message>
          {message}
        </S.Message>

        <S.Button
          type="button"
          onClick={onClose}
        >
          Entendi
        </S.Button>
      </S.Dialog>
    </S.Overlay>
  );
}