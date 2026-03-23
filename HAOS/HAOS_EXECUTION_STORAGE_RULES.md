# REGRA OFICIAL — EXECUÇÃO, COMMITS, VAULT E ARMAZENAMENTO

## 1. REGRA-MÃE DE CONFIRMAÇÃO
Se eu não tiver 100% de certeza sobre o padrão solicitado, o escopo, o destino, a vault, o tipo de registro ou se deve haver commit/push, eu devo perguntar antes de agir.
Nunca inferir padrão em silêncio.

## 2. ESCOPO OFICIAL DE CORREÇÃO
Quando estivermos aplicando uma correção, o escopo padrão é:

1. Relatório
2. Commit no repositório público:
   https://github.com/simtransforma/HAOS_HAU-AI-Operating-System
   Regra: não expor dados pessoais, segredos, credenciais, bases de dados ou conteúdos sensíveis.
3. Commit no repositório privado:
   https://github.com/simtransforma/principal-HAOS_HAU-AI-Operating-System
4. Documentação versionada na vault:
   ~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Obsidian-Vault

## 3. COMMITS FORA DE CORREÇÃO
Fora do processo de correção, só fazer commit quando o usuário pedir explicitamente.

## 4. DOCUMENTAÇÃO DE TAREFAS E PROJETOS

Toda tarefa concluída deve ser documentada em:
~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Tarefas-Projetos-Vault/Tarefas

Todo projeto concluído deve ser documentado em:
~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Tarefas-Projetos-Vault/Projetos

Regra fixa adicional (V7+):
- Toda correção/tarefa operacional concluída também deve ter resumo técnico na:
  ~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Obsidian-Vault

## 5. VAULT PESSOAL
A vault raiz:
~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian
é pessoal e só pode ser usada quando o usuário pedir explicitamente com a tag:
#Vault Pessoal

## 6. CREDENCIAIS E SEGREDOS
A pasta oficial para buscar credenciais, tokens, senhas, APIs e segredos é:
~/.env (servidor Linux — chmod 600, nunca expor valores no chat)

Referência OneDrive (somente leitura quando sincronizado):
~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/_secrets

## 7. PASTA PADRÃO DE SALVAMENTO
A pasta padrão para salvar arquivos, documentos, planilhas, imagens e entregáveis é:
~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System

Regra:
- nunca salvar solto
- sempre organizar em subpastas corretas
- sempre nomear com padrão: data_nome-projeto_descricao

Exemplo:
210326_haos-openclaw_setup-completo.md

## 8. PATHS DE REFERÊNCIA — AMBIENTE OPENCLAW (LINUX)

| Propósito | Path Linux |
|-----------|-----------|
| Vault HAOS (docs gerais) | `~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Obsidian-Vault` |
| Vault Tarefas | `~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Tarefas-Projetos-Vault/Tarefas` |
| Vault Projetos | `~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System/Obsidian/HAOS-Tarefas-Projetos-Vault/Projetos` |
| Entregáveis gerais | `~/OneDrive/Documentos/Projetos/Agencia HAU - Soluções Digitais/HAO IA Operation System` |
| Credenciais | `~/.env` |
| Runtime HAOS | `~/haos-runtime/HAOS` |
| Memória diária | `~/memory/YYYY-MM-DD.md` |
| Memória longa | `~/MEMORY.md` |

Pré-requisito: OneDrive deve estar sincronizado.
Sync manual: `onedrive --sync`
Verificar sync: `ls ~/OneDrive/Documentos/Projetos/Agencia\ HAU\ -\ Soluções\ Digitais/HAO\ IA\ Operation\ System/Obsidian/`

## 9. PROIBIÇÕES
- Não usar a vault errada por inferência.
- Não fazer commit fora de correção sem pedido explícito.
- Não publicar conteúdo sensível no repositório público.
- Não salvar arquivos soltos fora de estrutura.
- Não presumir "padrão de correção" se houver dúvida sobre escopo.
- Nunca expor valores de credenciais no chat.

## 10. GATILHOS DE PERGUNTA OBRIGATÓRIA
Se o pedido mencionar algo como:
- "faz os commits"
- "atualiza a vault"
- "segue o padrão"
- "documenta isso"
- "salva isso"
e o escopo não estiver 100% claro, eu devo perguntar antes de agir.

## 11. CHECKLIST DE FECHAMENTO OBRIGATÓRIO (NÃO NEGOCIÁVEL)
Uma tarefa só pode ser considerada concluída quando os 3 itens abaixo forem feitos:

1. Entrega validada
2. Registro na vault correta (com caminho completo do arquivo)
3. Confirmação final no chat contendo o caminho do registro

Regra: se qualquer item do checklist faltar, a tarefa permanece em aberto.
