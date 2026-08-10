import {
  useEffect,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  useCurrentAdmin,
} from "../../../hooks/useCurrentAdmin";

import {
  useThemeMode,
} from "../../../contexts/ThemeModeContext";

import {
  changeAdminPassword,
  updateAdminProfile,
} from "../../../lib/auth";

import {
  getSiteSettings,
  updateSiteSettings,
} from "../../../lib/settings";

import * as S from "./styles";

export default function AdminConfiguracoes() {
  const {
    user,
    setUser,
  } = useCurrentAdmin();

  const {
    mode,
    setMode,
  } = useThemeMode();

  /*
   * Dados da conta
   */
  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  /*
   * Alteração de senha
   */
  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false);

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  /*
   * Configurações do site
   *
   * Disponíveis somente para OWNER.
   */
  const [
    whatsapp,
    setWhatsapp,
  ] = useState("");

  const [
    instagram,
    setInstagram,
  ] = useState("");

  const [
    maxProjectImages,
    setMaxProjectImages,
  ] = useState("20");

  const [
    maxProjectImageSizeMb,
    setMaxProjectImageSizeMb,
  ] = useState("10");

  const [
    loadingSettings,
    setLoadingSettings,
  ] = useState(false);

  const [
    savingSettings,
    setSavingSettings,
  ] = useState(false);

  const [
    settingsMessage,
    setSettingsMessage,
  ] = useState("");

  const [
    settingsError,
    setSettingsError,
  ] = useState("");

  /*
   * Preenche os dados da conta
   * com o usuário autenticado.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setEmail(user.email);
  }, [user]);

  /*
   * Carrega as configurações
   * do site somente para OWNER.
   */
  useEffect(() => {
    if (
      !user ||
      user.role !== "OWNER"
    ) {
      return;
    }

    let cancelled = false;

    async function loadSettings() {
      setLoadingSettings(true);
      setSettingsError("");

      try {
        const settings =
          await getSiteSettings();

        if (cancelled) {
          return;
        }

        setWhatsapp(
          settings.whatsapp ?? ""
        );

        setInstagram(
          settings.instagram ?? ""
        );

        setMaxProjectImages(
          String(
            settings.maxProjectImages
          )
        );

        setMaxProjectImageSizeMb(
          String(
            settings.maxProjectImageSizeMb
          )
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Erro ao carregar configurações do site:",
          error
        );

        setSettingsError(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar as configurações do site."
        );
      } finally {
        if (!cancelled) {
          setLoadingSettings(false);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /*
   * Salva nome e e-mail.
   */
  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response =
        await updateAdminProfile({
          name,
          email,
        });

      setName(
        response.user.name
      );

      setEmail(
        response.user.email
      );

      setUser(
        response.user
      );

      setMessage(
        "Dados atualizados com sucesso."
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar dados do administrador:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar as alterações."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * Altera a senha.
   */
  async function handleChangePassword() {
    setChangingPassword(true);

    setPasswordMessage("");
    setPasswordError("");

    try {
      const response =
        await changeAdminPassword({
          currentPassword,
          newPassword,
          confirmPassword,
        });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        response.message
      );
    } catch (error) {
      console.error(
        "Erro ao alterar senha:",
        error
      );

      setPasswordError(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar a senha."
      );
    } finally {
      setChangingPassword(false);
    }
  }

  /*
   * Salva as configurações
   * exclusivas do OWNER.
   */
  async function handleSaveSettings() {
    setSavingSettings(true);

    setSettingsMessage("");
    setSettingsError("");

    const parsedMaxImages =
      Number(
        maxProjectImages
      );

    const parsedMaxSizeMb =
      Number(
        maxProjectImageSizeMb
      );

    if (
      !Number.isInteger(
        parsedMaxImages
      ) ||
      parsedMaxImages < 1
    ) {
      setSettingsError(
        "O máximo de imagens deve ser um número inteiro maior que zero."
      );

      setSavingSettings(false);

      return;
    }

    if (
      !Number.isFinite(
        parsedMaxSizeMb
      ) ||
      parsedMaxSizeMb <= 0
    ) {
      setSettingsError(
        "O tamanho máximo por imagem deve ser maior que zero."
      );

      setSavingSettings(false);

      return;
    }

    try {
      const settings =
        await updateSiteSettings({
          whatsapp:
            whatsapp.trim(),

          instagram:
            instagram.trim(),

          maxProjectImages:
            parsedMaxImages,

          maxProjectImageSizeMb:
            parsedMaxSizeMb,
        });

      setWhatsapp(
        settings.whatsapp ?? ""
      );

      setInstagram(
        settings.instagram ?? ""
      );

      setMaxProjectImages(
        String(
          settings.maxProjectImages
        )
      );

      setMaxProjectImageSizeMb(
        String(
          settings.maxProjectImageSizeMb
        )
      );

      setSettingsMessage(
        "Configurações do site atualizadas com sucesso."
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar configurações do site:",
        error
      );

      setSettingsError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar as configurações do site."
      );
    } finally {
      setSavingSettings(false);
    }
  }

  return (
    <>
      <div
        style={{
          marginBottom:
            "24px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "inherit",
            fontSize:
              "1.5rem",
          }}
        >
          Configurações
        </h1>

        <p
          style={{
            marginTop:
              "6px",
            opacity: 0.7,
          }}
        >
          Gerencie sua conta,
          aparência e
          configurações do site.
        </p>
      </div>

      <S.Grid>
        {/* =========================
            CONTA
        ========================== */}
        <S.Card>
          <S.CardHeader>
            <div>
              <h2>
                Conta
              </h2>

              <p>
                Dados do
                administrador
              </p>
            </div>
          </S.CardHeader>

          <S.Form>
            <S.Field>
              <label htmlFor="admin-name">
                Nome
              </label>

              <input
                id="admin-name"
                type="text"
                value={name}
                onChange={(
                  event
                ) =>
                  setName(
                    event.target
                      .value
                  )
                }
                required
                minLength={3}
              />
            </S.Field>

            <S.Field>
              <label htmlFor="admin-email">
                E-mail
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(
                  event
                ) =>
                  setEmail(
                    event.target
                      .value
                  )
                }
                required
              />
            </S.Field>

            {error && (
              <S.ErrorMessage>
                {error}
              </S.ErrorMessage>
            )}

            {message && (
              <S.SuccessMessage>
                {message}
              </S.SuccessMessage>
            )}

            <S.Actions>
              <S.PrimaryButton
                type="button"
                onClick={
                  handleSave
                }
                disabled={
                  saving
                }
              >
                {saving
                  ? "Salvando..."
                  : "Salvar alterações"}
              </S.PrimaryButton>
            </S.Actions>
          </S.Form>
        </S.Card>

        {/* =========================
            APARÊNCIA
        ========================== */}
        <S.Card>
          <S.CardHeader>
            <div>
              <h2>
                Aparência
              </h2>

              <p>
                Escolha o tema
                do painel.
              </p>
            </div>
          </S.CardHeader>

          <S.Options>
            <S.Option
              type="button"
              $active={
                mode ===
                "light"
              }
              onClick={() =>
                setMode(
                  "light"
                )
              }
            >
              <S.OptionContent>
                <strong>
                  Modo claro
                </strong>

                <span>
                  Tema claro
                </span>
              </S.OptionContent>

              <S.Radio
                $active={
                  mode ===
                  "light"
                }
              />
            </S.Option>

            <S.Option
              type="button"
              $active={
                mode ===
                "dark"
              }
              onClick={() =>
                setMode(
                  "dark"
                )
              }
            >
              <S.OptionContent>
                <strong>
                  Modo escuro
                </strong>

                <span>
                  Tema escuro
                </span>
              </S.OptionContent>

              <S.Radio
                $active={
                  mode ===
                  "dark"
                }
              />
            </S.Option>
          </S.Options>
        </S.Card>

        {/* =========================
            SEGURANÇA
        ========================== */}
        <S.Card>
          <S.CardHeader>
            <div>
              <h2>
                Segurança
              </h2>

              <p>
                Altere a senha
                de acesso ao
                painel
                administrativo.
              </p>
            </div>
          </S.CardHeader>

          <S.Form>
            <S.Field>
              <label htmlFor="current-password">
                Senha atual
              </label>

              <S.PasswordInputWrapper>
                <S.PasswordInput
                  id="current-password"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    currentPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setCurrentPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="current-password"
                />

                <S.PasswordToggle
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (
                        current
                      ) =>
                        !current
                    )
                  }
                  aria-label={
                    showCurrentPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
            </S.Field>

            <S.Field>
              <label htmlFor="new-password">
                Nova senha
              </label>

              <S.PasswordInputWrapper>
                <S.PasswordInput
                  id="new-password"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    newPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setNewPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="new-password"
                />

                <S.PasswordToggle
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (
                        current
                      ) =>
                        !current
                    )
                  }
                  aria-label={
                    showNewPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
            </S.Field>

            <S.Field>
              <label htmlFor="confirm-password">
                Confirmar nova
                senha
              </label>

              <S.PasswordInputWrapper>
                <S.PasswordInput
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setConfirmPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="new-password"
                />

                <S.PasswordToggle
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (
                        current
                      ) =>
                        !current
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
            </S.Field>

            {passwordError && (
              <S.ErrorMessage>
                {
                  passwordError
                }
              </S.ErrorMessage>
            )}

            {passwordMessage && (
              <S.SuccessMessage>
                {
                  passwordMessage
                }
              </S.SuccessMessage>
            )}

            <S.Actions>
              <S.PrimaryButton
                type="button"
                onClick={
                  handleChangePassword
                }
                disabled={
                  changingPassword
                }
              >
                {changingPassword
                  ? "Alterando..."
                  : "Alterar senha"}
              </S.PrimaryButton>
            </S.Actions>
          </S.Form>
        </S.Card>

        {/* =========================
            CONFIGURAÇÕES DO SITE
            SOMENTE OWNER
        ========================== */}
        {user?.role ===
          "OWNER" && (
          <S.Card>
            <S.CardHeader>
              <div>
                <h2>
                  Configurações
                  do site
                </h2>

                <p>
                  Informações exibidas
                  no site e limites
                  dos projetos.
                </p>
              </div>
            </S.CardHeader>

            {loadingSettings ? (
              <S.Info>
                <span>
                  Carregando
                  configurações...
                </span>
              </S.Info>
            ) : (
              <S.Form>
                <S.Field>
                  <label htmlFor="site-whatsapp">
                    WhatsApp
                  </label>

                  <input
                    id="site-whatsapp"
                    type="text"
                    value={
                      whatsapp
                    }
                    onChange={(
                      event
                    ) =>
                      setWhatsapp(
                        event.target
                          .value
                      )
                    }
                    placeholder="(41) 99999-9999"
                  />
                </S.Field>

                <S.Field>
                  <label htmlFor="site-instagram">
                    Instagram
                  </label>

                  <input
                    id="site-instagram"
                    type="text"
                    value={
                      instagram
                    }
                    onChange={(
                      event
                    ) =>
                      setInstagram(
                        event.target
                          .value
                      )
                    }
                    placeholder="@roomarquitetura"
                  />
                </S.Field>

                <S.Field>
                  <label htmlFor="max-project-images">
                    Máximo de imagens
                    por projeto
                  </label>

                  <input
                    id="max-project-images"
                    type="number"
                    min={1}
                    step={1}
                    value={
                      maxProjectImages
                    }
                    onChange={(
                      event
                    ) =>
                      setMaxProjectImages(
                        event.target
                          .value
                      )
                    }
                  />
                </S.Field>

                <S.Field>
                  <label htmlFor="max-project-image-size">
                    Tamanho máximo
                    por imagem
                  </label>

                  <input
                    id="max-project-image-size"
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={
                      maxProjectImageSizeMb
                    }
                    onChange={(
                      event
                    ) =>
                      setMaxProjectImageSizeMb(
                        event.target
                          .value
                      )
                    }
                  />
                </S.Field>

                {settingsError && (
                  <S.ErrorMessage>
                    {
                      settingsError
                    }
                  </S.ErrorMessage>
                )}

                {settingsMessage && (
                  <S.SuccessMessage>
                    {
                      settingsMessage
                    }
                  </S.SuccessMessage>
                )}

                <S.Actions>
                  <S.PrimaryButton
                    type="button"
                    onClick={
                      handleSaveSettings
                    }
                    disabled={
                      savingSettings
                    }
                  >
                    {savingSettings
                      ? "Salvando..."
                      : "Salvar configurações"}
                  </S.PrimaryButton>
                </S.Actions>
              </S.Form>
            )}
          </S.Card>
        )}
      </S.Grid>
    </>
  );
}