import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { apiFetch } from "../lib/api";

const Section = styled.section`
  padding: 3rem 0 5rem;
`;

const Card = styled.div`
  max-width: 560px;
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
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
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
  font-weight: 600;
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

const Message = styled.div<{ $error?: boolean }>`
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.dangerBorder : theme.colors.successBorder};
  background: ${({ theme, $error }) =>
    $error ? theme.colors.dangerSoft : theme.colors.successSoft};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export default function AdminRequestAccess() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch("/admin-auth/register-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível enviar a solicitação.");
      }

      setMessage(
        "Solicitação enviada com sucesso. Aguarde a aprovação da responsável."
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao solicitar acesso."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section>
      <Container>
        <Card>
          <Eyebrow>Painel admin</Eyebrow>
          <Title>Solicitar acesso</Title>
          <Text>
            O acesso ao painel admin depende de aprovação manual da responsável pela ROOM.
          </Text>

          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Field>

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

            {message && <Message>{message}</Message>}
            {errorMessage && <Message $error>{errorMessage}</Message>}

            <Actions>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Enviando..." : "Solicitar acesso"}
              </Button>

              <Button type="button" variant="ghost" onClick={() => navigate("/admin/login")}>
                Voltar ao login
              </Button>
            </Actions>
          </Form>
        </Card>
      </Container>
    </Section>
  );
}
