# Security Templates (HAOS)

Arquivos:

- `password-argon2id.ts` → hash/verify de senha com Argon2id + pepper + rehash progressivo
- `secrets-aes-gcm.ts` → criptografia/descriptografia de API keys/tokens com AES-256-GCM

## Variáveis de ambiente obrigatórias

```env
PASSWORD_PEPPER="trocar-por-pepper-forte"
MASTER_ENCRYPTION_KEY_BASE64="trocar-por-chave-base64-32bytes"
```

## Regra simples

- Senha de usuário = hash
- API key/token = criptografia
