import styled from "styled-components";
import { media } from "../../styles/breakpoints";

const WHATSAPP_URL = "https://wa.me/5547997711663";

export function WhatsAppButton() {
  return (
    <Wrapper
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <Icon aria-hidden="true">💬</Icon>
      <Label>Fale no WhatsApp</Label>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 999;
  height: 56px;
  min-width: 56px;
  padding: 0 1rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    opacity 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.34);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
  line-height: 1;
`;

const Label = styled.span`
  display: none;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;

  @media ${media.tablet} {
    display: inline;
  }
`;