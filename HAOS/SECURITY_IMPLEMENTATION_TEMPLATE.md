# SECURITY_IMPLEMENTATION_TEMPLATE.md

Padrão pronto para implementação (HAOS)

## 1) Senha de usuário (Argon2id + pepper)

- Use `Argon2id`
- Salt é automático
- Pepper vem do ambiente (`PASSWORD_PEPPER`)
- Rehash automático no login quando parâmetros mudarem

### Dependência (Node)

```bash
npm i argon2
```

### Exemplo

Arquivo: `templates/security/password-argon2id.ts`

---

## 2) API key / token (criptografia reversível)

- Use `AES-256-GCM`
- Chave mestra em env (`MASTER_ENCRYPTION_KEY_BASE64` com 32 bytes)
- Nunca salvar segredo em texto puro no banco
- Nunca logar segredo completo

### Exemplo

Arquivo: `templates/security/secrets-aes-gcm.ts`

---

## 3) Variáveis de ambiente

Copie para seu `.env`:

```env
# 32+ chars aleatórios
PASSWORD_PEPPER="trocar-por-pepper-forte"

# 32 bytes em base64
# Exemplo para gerar (Node): Buffer.from(require('crypto').randomBytes(32)).toString('base64')
MASTER_ENCRYPTION_KEY_BASE64="trocar-por-chave-base64"
```

---

## 4) Regras de uso rápido

- Senha de usuário: hash (Argon2id)
- API key/token: criptografia (AES-256-GCM)
- Não commitar `.env`
- Rotacionar chave mestra periodicamente
- Mascarar segredos em logs/UI
