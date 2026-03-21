import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import type { ProposalSchemaValues } from "../../../schemas/proposalSchema";
import {
  contactMethodOptions,
  referralSourceOptions,
} from "../../../data/proposalOptions";
import {
  StepWrapper,
  StepHeader,
  StepTitle,
  StepDescription,
  Inline,
  Field,
  Label,
  Input,
  Select,
  ErrorText,
} from "../ProposalFields";
import { maskCpf, maskDate, maskPhone } from "../../../utils/masks";

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

export function StepPersonalInfo() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProposalSchemaValues>();

  const preferredContactMethod = watch("preferredContactMethod");
  const referralSource = watch("referralSource");
  const cpfValue = watch("cpf");
  const birthDateValue = watch("birthDate");
  const phoneValue = watch("phone");

  return (
    <StepWrapper>
      <StepHeader>
        <StepTitle>Seus dados</StepTitle>
        <StepDescription>
          Essas informações ajudam a ROOM a identificar sua solicitação e iniciar o contato da melhor forma.
        </StepDescription>
      </StepHeader>

      <Inline>
        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <ErrorText>{String(errors.email.message)}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="fullName">Nome completo</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <ErrorText>{String(errors.fullName.message)}</ErrorText>
          )}
        </Field>
      </Inline>

      <Inline>
        <Field>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={cpfValue}
            onChange={(event) =>
              setValue("cpf", maskCpf(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          {errors.cpf && <ErrorText>{String(errors.cpf.message)}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="birthDate">Data de nascimento</Label>
          <Input
            id="birthDate"
            inputMode="numeric"
            placeholder="dd/mm/aaaa"
            value={birthDateValue}
            onChange={(event) =>
              setValue("birthDate", maskDate(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          {errors.birthDate && (
            <ErrorText>{String(errors.birthDate.message)}</ErrorText>
          )}
        </Field>
      </Inline>

      <Field>
        <Label htmlFor="address">Endereço completo</Label>
        <Input id="address" {...register("address")} />
        {errors.address && <ErrorText>{String(errors.address.message)}</ErrorText>}
      </Field>

      <Inline>
        <Field>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            inputMode="numeric"
            placeholder="(00) 00000-0000"
            value={phoneValue}
            onChange={(event) =>
              setValue("phone", maskPhone(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          {errors.phone && <ErrorText>{String(errors.phone.message)}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="socialProfile">Rede social</Label>
          <Input
            id="socialProfile"
            placeholder="@seuperfil"
            {...register("socialProfile")}
          />
        </Field>
      </Inline>

      <Inline>
        <Column>
          <Field>
            <Label htmlFor="preferredContactMethod">Melhor meio de contato</Label>
            <Select
              id="preferredContactMethod"
              {...register("preferredContactMethod")}
            >
              {contactMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.preferredContactMethod && (
              <ErrorText>
                {String(errors.preferredContactMethod.message)}
              </ErrorText>
            )}
          </Field>

          {preferredContactMethod === "outro" && (
            <Field>
              <Label htmlFor="preferredContactMethodOther">
                Descreva a outra forma de contato
              </Label>
              <Input
                id="preferredContactMethodOther"
                {...register("preferredContactMethodOther")}
              />
              {errors.preferredContactMethodOther && (
                <ErrorText>
                  {String(errors.preferredContactMethodOther.message)}
                </ErrorText>
              )}
            </Field>
          )}
        </Column>

        <Column>
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
              <ErrorText>{String(errors.referralSource.message)}</ErrorText>
            )}
          </Field>

          {referralSource === "outro" && (
            <Field>
              <Label htmlFor="referralSourceOther">
                Descreva como conheceu a ROOM
              </Label>
              <Input
                id="referralSourceOther"
                {...register("referralSourceOther")}
              />
              {errors.referralSourceOther && (
                <ErrorText>
                  {String(errors.referralSourceOther.message)}
                </ErrorText>
              )}
            </Field>
          )}
        </Column>
      </Inline>
    </StepWrapper>
  );
}