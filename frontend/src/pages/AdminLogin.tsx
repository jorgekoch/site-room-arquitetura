import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { setAdminToken } from "../lib/auth";

const API_URL = import.meta.env.VITE_API_URL;

const Section = styled.section`
  padding: 3rem 0 5rem;
`;

const Card = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: grid;
  gap: 1rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(196, 110, 78, 0.12);
  border: 1px solid rgba(196, 110, 78, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.08;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Field = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
`;

const Input = styled.input`
  min-height: 50px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
`;

const ErrorBox = styled.div`
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(255, 107, 107, 0.35);
  background: rgba(255, 107, 107, 0.08);
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.6;
`;

const FooterActions = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const LinkButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-align: left;
`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  try {
    setIsSubmitting(true);
    setErrorMessage("");

    console.log("API_URL:", API_URL);
    console.log("LOGIN URL:", `${API_URL}/api/admin-auth/login`);

    const response = await fetch(`${API_URL}/api/admin-auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("STATUS:", response.status);

    const data = await response.json().catch(() => null);
    console.log("DATA:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Não foi possível fazer login.");
    }

    setAdminToken(data.token);
    navigate("/admin/propostas");
  } catch (error) {
    console.error(error);
    setErrorMessage(
      error instanceof Error ? error.message : "Erro ao autenticar."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <Section>
      <Container>
        <Card>
          <Eyebrow>Painel admin</Eyebrow>
          <Title>Acesso restrito</Title>
          <Text>
            Entre com suas credenciais para acessar as solicitações de proposta da ROOM.
          </Text>

          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Field>

            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Form>

          <FooterActions>
            <LinkButton type="button" onClick={() => navigate("/admin/solicitar-acesso")}>
              Solicitar novo acesso admin
            </LinkButton>
          </FooterActions>
        </Card>
      </Container>
    </Section>
  );
}