import crypto from "node:crypto";

type EncryptedSecret = {
  iv: string;
  tag: string;
  ciphertext: string;
};

function getMasterKey(): Buffer {
  const keyB64 = process.env.MASTER_ENCRYPTION_KEY_BASE64;
  if (!keyB64) throw new Error("MASTER_ENCRYPTION_KEY_BASE64 ausente");
  const key = Buffer.from(keyB64, "base64");
  if (key.length !== 32) throw new Error("Chave mestra deve ter 32 bytes (AES-256)");
  return key;
}

export function encryptSecret(plain: string): EncryptedSecret {
  const key = getMasterKey();
  const iv = crypto.randomBytes(12); // GCM nonce

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function decryptSecret(payload: EncryptedSecret): string {
  const key = getMasterKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const ciphertext = Buffer.from(payload.ciphertext, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plain.toString("utf8");
}

export function maskSecret(secret: string): string {
  if (secret.length <= 8) return "****";
  return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
}
