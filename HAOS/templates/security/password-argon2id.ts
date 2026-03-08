import argon2 from "argon2";

const argonOptions: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64 MB
  timeCost: 3,
  parallelism: 2,
};

function getPepper(): string {
  const pepper = process.env.PASSWORD_PEPPER;
  if (!pepper || pepper.length < 16) {
    throw new Error("PASSWORD_PEPPER ausente ou fraco");
  }
  return pepper;
}

export async function hashPassword(plainPassword: string): Promise<string> {
  const peppered = `${plainPassword}${getPepper()}`;
  return argon2.hash(peppered, argonOptions);
}

export async function verifyPassword(
  plainPassword: string,
  storedHash: string,
): Promise<{ ok: boolean; upgradedHash?: string }> {
  const peppered = `${plainPassword}${getPepper()}`;
  const ok = await argon2.verify(storedHash, peppered);
  if (!ok) return { ok: false };

  // Rehash progressivo caso parâmetros mudem
  const needsRehash = await argon2.needsRehash(storedHash, argonOptions);
  if (!needsRehash) return { ok: true };

  const upgradedHash = await argon2.hash(peppered, argonOptions);
  return { ok: true, upgradedHash };
}
