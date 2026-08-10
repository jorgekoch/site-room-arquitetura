import styled from "styled-components";

import { useSiteSettings } from "../../hooks/useSiteSettings";

export function FloatingWhatsApp() {
  const {
    settings,
  } = useSiteSettings();

  const whatsapp =
    settings?.whatsapp?.trim() || "";

  if (!whatsapp) {
    return null;
  }

  const whatsappNumber =
    whatsapp.replace(/\D/g, "");

  if (!whatsappNumber) {
    return null;
  }

  const normalizedNumber =
    whatsappNumber.startsWith("55")
      ? whatsappNumber
      : `55${whatsappNumber}`;

  const whatsappUrl =
    `https://wa.me/${normalizedNumber}`;

  return (
    <Button
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <Icon
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.59 5.92L.1 24l6.36-1.67a11.88 11.88 0 0 0 5.59 1.42h.01c6.54 0 11.86-5.32 11.86-11.87 0-3.17-1.24-6.15-3.4-8.4ZM12.06 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.82 9.82 0 0 1-1.51-5.18C2.17 6.44 6.6 2.02 12.05 2.02c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.91 7.02c0 5.44-4.43 9.86-9.91 9.86Zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </Icon>

      <Label>
        WhatsApp
      </Label>
    </Button>
  );
}

const Button = styled.a`
  position: fixed;

  right: 1.25rem;
  bottom: 1.25rem;

  z-index: 1000;

  display: inline-flex;
  align-items: center;
  gap: 0.7rem;

  padding: 0.9rem 1rem;

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  background: #25d366;
  color: #ffffff;

  text-decoration: none;
  font-weight: 700;

  font-size:
    ${({ theme }) =>
      theme.fontSizes.sm};

  box-shadow:
    0 12px 30px
    rgba(
      37,
      211,
      102,
      0.28
    );

  transition:
    transform
      ${({ theme }) =>
        theme.transitions.default},
    box-shadow
      ${({ theme }) =>
        theme.transitions.default},
    filter
      ${({ theme }) =>
        theme.transitions.default};

  &:hover {
    transform:
      translateY(-2px);

    box-shadow:
      0 16px 36px
      rgba(
        37,
        211,
        102,
        0.34
      );

    filter:
      brightness(1.03);
  }

  &:active {
    transform:
      translateY(0);
  }

  @media (max-width: 640px) {
    right: 1rem;
    bottom: 1rem;

    padding: 0.85rem;
  }
`;

const Icon = styled.svg`
  width: 22px;
  height: 22px;

  fill: currentColor;

  flex-shrink: 0;
`;

const Label = styled.span`
  @media (max-width: 640px) {
    display: none;
  }
`;