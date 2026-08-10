import { useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { publicApiFetch } from "../../lib/publicApi";

const Section = styled.section`
  padding: 3rem 0 5rem;
`;

const Card = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 1.5rem;

  border-radius: ${({ theme }) =>
    theme.radius.lg};

  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  box-shadow: ${({ theme }) =>
    theme.shadow.sm};

  display: grid;
  gap: 1rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;

  padding: 0.45rem 0.9rem;

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background: ${({ theme }) =>
    theme.colors.secondarySoft};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.secondaryBorder};

  color: ${({ theme }) =>
    theme.colors.secondary};

  font-size: ${({ theme }) =>
    theme.fontSizes.xs};

  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  font-size: clamp(
    1.8rem,
    4vw,
    2.6rem
  );

  line-height: 1.08;
`;

const Text = styled.p`
  color: ${({ theme }) =>
    theme.colors.textSoft};

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
  font-size: ${({ theme }) =>
    theme.fontSizes.sm};

  font-weight: 600;
`;

const Input = styled.input`
  min-height: 50px;
  width: 100%;

  border-radius: ${({ theme }) =>
    theme.radius.md};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.backgroundSoft};

  color: ${({ theme }) =>
    theme.colors.text};

  padding: 0.9rem 1rem;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary};

    box-shadow:
      0 0 0 3px
      ${({ theme }) =>
        theme.colors.primaryRing};
  }
`;

const ErrorBox = styled.div`
  padding: 0.95rem 1rem;

  border-radius: ${({ theme }) =>
    theme.radius.md};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.dangerBorder};

  background: ${({ theme }) =>
    theme.colors.dangerSoft};

  color: ${({ theme }) =>
    theme.colors.danger};

  line-height: 1.6;
`;

const SuccessBox = styled.div`
  padding: 0.95rem 1rem;

  border-radius: ${({ theme }) =>
    theme.radius.md};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.successBorder};

  background: ${({ theme }) =>
    theme.colors.successSoft};

  color: ${({ theme }) =>
    theme.colors.success};

  line-height: 1.6;
`;

const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LinkButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;

  color: ${({ theme }) =>
    theme.colors.primary};

  cursor: pointer;

  font: inherit;
  font-size: ${({ theme }) =>
    theme.fontSizes.sm};

  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

export default function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response =
        await publicApiFetch(
          "/admin-auth/forgot-password",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
            }),
          }
        );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Não foi possível solicitar a recuperação da senha."
        );
      }

      setSuccessMessage(
        data?.message ||
          "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha."
      );

      setEmail("");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível solicitar a recuperação da senha."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section>
      <Container>
        <Card>
          <Eyebrow>
            Recuperação de acesso
          </Eyebrow>

          <Title>
            Esqueceu sua senha?
          </Title>

          <Text>
            Informe o e-mail utilizado
            no acesso administrativo da
            ROOM. Se ele estiver
            cadastrado, enviaremos um
            link para criar uma nova
            senha.
          </Text>

          {successMessage && (
            <SuccessBox>
              {successMessage}
            </SuccessBox>
          )}

          {errorMessage && (
            <ErrorBox>
              {errorMessage}
            </ErrorBox>
          )}

          {!successMessage && (
            <Form
              onSubmit={handleSubmit}
            >
              <Field>
                <Label htmlFor="email">
                  E-mail
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Enviando..."
                  : "Enviar link de recuperação"}
              </Button>
            </Form>
          )}

          <FooterActions>
            <LinkButton
              type="button"
              onClick={() =>
                navigate(
                  "/admin/login"
                )
              }
            >
              Voltar para o login
            </LinkButton>
          </FooterActions>
        </Card>
      </Container>
    </Section>
  );
}