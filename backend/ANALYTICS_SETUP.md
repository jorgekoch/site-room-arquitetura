# Google Analytics 4 — Dashboard

## Dados da propriedade ROOM

- Measurement ID: `G-1DT7DM61CR`
- Property ID: `550638716`
- Account ID: `405252339`

## Variáveis do backend

Configure no ambiente do backend:

```env
GOOGLE_ANALYTICS_PROPERTY_ID=550638716
GOOGLE_ANALYTICS_CLIENT_EMAIL=...
GOOGLE_ANALYTICS_PRIVATE_KEY=...
```

`GOOGLE_ANALYTICS_CLIENT_EMAIL` e `GOOGLE_ANALYTICS_PRIVATE_KEY` são credenciais de uma conta de serviço do Google Cloud. **Nunca** coloque a chave privada no frontend, Git ou arquivo versionado.

## Configuração da conta de serviço

1. No Google Cloud Console, crie ou selecione um projeto.
2. Ative a **Google Analytics Data API**.
3. Crie uma conta de serviço.
4. Gere uma chave JSON para essa conta de serviço.
5. No Google Analytics, abra a propriedade `550638716` e vá para o gerenciamento de acesso da propriedade.
6. Adicione o e-mail da conta de serviço com permissão de leitura dos dados (por exemplo, `Viewer`).
7. No ambiente do backend, copie o `client_email` para `GOOGLE_ANALYTICS_CLIENT_EMAIL`.
8. Copie o `private_key` para `GOOGLE_ANALYTICS_PRIVATE_KEY`. Em plataformas que não preservam quebras de linha, mantenha `\\n` no valor.

O endpoint protegido `/analytics/overview` retorna os dados somente para usuários autenticados do painel.

Se as credenciais ainda não estiverem configuradas, o endpoint responde com `configured: false` e o site continua funcionando sem Analytics no Dashboard.
