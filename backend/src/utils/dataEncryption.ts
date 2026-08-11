import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "crypto";

import { env } from "../config/env";

const ALGORITHM = "aes-256-gcm";
const VERSION = "enc:v1";
const KEY = Buffer.from(env.dataEncryptionKey, "base64");

function isEncrypted(value: string) {
  return value.startsWith(`${VERSION}:`);
}

/** Criptografa valores pessoais antes de persistí-los no banco. */
export function encryptPersonalData(value: string): string {
  if (isEncrypted(value)) return value;

  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  return [
    VERSION,
    iv.toString("base64url"),
    cipher.getAuthTag().toString("base64url"),
    encrypted.toString("base64url"),
  ].join(":");
}

/**
 * Mantém leitura dos registros legados até a migração ser executada.
 * Valores no formato enc:v1 são autenticados pelo AES-GCM antes da leitura.
 */
export function decryptPersonalData(value: string): string {
  if (!isEncrypted(value)) return value;

  const [, , ivValue, tagValue, encryptedValue] = value.split(":");

  if (!ivValue || !tagValue || !encryptedValue) {
    throw new Error("Valor criptografado inválido.");
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(ivValue, "base64url")
  );
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
