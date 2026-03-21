import styled from "styled-components";
import { siteConfig } from "../../config/site";

export function FloatingWhatsApp() {
  return (
    <Button
      href={siteConfig.contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <Icon viewBox="0 0 32 32" aria-hidden="true">
        <path d="M19.11 17.39c-.27-.14-1.58-.78-1.82-.87-.24-.09-.41-.14-.58.14-.17.27-.67.87-.82 1.05-.15.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.35-.79-.7-1.33-1.57-1.48-1.84-.15-.27-.02-.42.11-.56.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.49c-.18 0-.47.07-.71.34-.24.27-.92.9-.92 2.19s.94 2.53 1.07 2.7c.14.18 1.84 2.81 4.46 3.94.62.27 1.11.43 1.49.55.63.2 1.21.17 1.66.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.07-.11-.24-.18-.51-.32Z" />
        <path d="M16.03 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.25.59 4.45 1.7 6.38L3 29l6.82-1.78a12.8 12.8 0 0 0 6.2 1.58h.01c7.06 0 12.79-5.72 12.79-12.79 0-3.42-1.33-6.63-3.75-9.04A12.7 12.7 0 0 0 16.03 3.2Zm0 23.4h-.01a10.62 10.62 0 0 1-5.41-1.48l-.39-.23-4.05 1.06 1.08-3.95-.25-.41a10.58 10.58 0 0 1-1.62-5.59c0-5.87 4.78-10.65 10.66-10.65 2.84 0 5.51 1.11 7.52 3.12a10.55 10.55 0 0 1 3.12 7.52c0 5.88-4.78 10.66-10.65 10.66Z" />
      </Icon>

      <Label>WhatsApp</Label>
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
  border-radius: ${({ theme }) => theme.radius.pill};

  background: #25d366;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.28);
  transition:
    transform ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default},
    filter ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(37, 211, 102, 0.34);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(0);
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