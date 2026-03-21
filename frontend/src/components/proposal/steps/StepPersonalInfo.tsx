import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValue } from "../../../schemas/proposalSchema";
import {
  contactMethodOptions,
  referralSourceOptions,
} from "../../../data/proposalOptions";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`;

const Inline = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
`;

const Select = styled.select`
  min-height: 50px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export function StepPersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProposalSchemaValue>();

  return (
    <Grid>
      <Inline>
        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <Error>{errors.email.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor="fullName">Nome completo</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && <Error>{errors.fullName.message}</Error>}
        </Field>
      </Inline>

      <Inline>
        <Field>
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" {...register("cpf")} />
          {errors.cpf && <Error>{errors.cpf.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor="birthDate">Data de nascimento</Label>
          <Input id="birthDate" type="date" {...register("birthDate")} />
          {errors.birthDate && <Error>{errors.birthDate.message}</Error>}
        </Field>
      </Inline>

      <Field>
        <Label htmlFor="address">Endereço completo</Label>
        <Input id="address" {...register("address")} />
        {errors.address && <Error>{errors.address.message}</Error>}
      </Field>

      <Inline>
        <Field>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor="socialProfile">Rede social</Label>
          <Input id="socialProfile" {...register("socialProfile")} />
        </Field>
      </Inline>

      <Inline>
        <Field>
          <Label htmlFor="preferredContactMethod">Melhor meio de contato</Label>
          <Select id="preferredContactMethod" {...register("preferredContactMethod")}>
            {contactMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.preferredContactMethod && (
            <Error>{errors.preferredContactMethod.message as string}</Error>
          )}
        </Field>

        <Field>
          <Label htmlFor="referralSource">Como conheceu a ROOM?</Label>
          <Select id="referralSource" {...register("referralSource")}>
            {referralSourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.referralSource && (
            <Error>{errors.referralSource.message as string}</Error>
          )}
        </Field>
      </Inline>
    </Grid>
  );
}