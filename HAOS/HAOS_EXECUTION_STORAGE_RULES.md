# REGRA OFICIAL — EXECUÇÃO, COMMITS, VAULT E ARMAZENAMENTO

## 1. REGRA-MÃE DE CONFIRMAÇÃO
Se não houver 100% de certeza sobre o padrão solicitado, o escopo, o destino, a vault, o tipo de registro ou se deve haver commit/push, perguntar antes de agir.
Nunca inferir padrão em silêncio.

## 2. ESCOPO OFICIAL DE CORREÇÃO
Quando uma correção for aplicada, o escopo padrão é:

1. Relatório
2. Commit no repositório público (sem dados pessoais, segredos ou credenciais)
3. Commit no repositório privado (com dados operacionais completos)
4. Documentação versionada na vault de documentação do projeto

## 3. COMMITS FORA DE CORREÇÃO
Fora do processo de correção, só fazer commit quando o usuário pedir explicitamente.

## 4. DOCUMENTAÇÃO DE TAREFAS E PROJETOS

Toda tarefa concluída deve ser documentada na **Vault de Tarefas** do projeto.

Todo projeto concluído deve ser documentado na **Vault de Projetos** do projeto.

Regra fixa adicional (V7+):
- Toda correção/tarefa operacional concluída também deve ter resumo técnico na **Vault Principal de Documentação**.

## 5. VAULT PESSOAL
A vault pessoal (dados do operador, credenciais, notas privadas) só pode ser acessada quando o usuário pedir explicitamente com a tag:
`#Vault Pessoal`

## 6. CREDENCIAIS E SEGREDOS
Credenciais, tokens, senhas e segredos devem ser armazenados em local seguro e isolado (ex: arquivo `.env` com permissão 600, gerenciador de segredos, vault dedicada).

Regras:
- Nunca expor valores de credenciais no chat ou em arquivos versionados
- Nunca commitar credenciais no repositório público
- Sempre buscar credenciais do local oficial definido pelo operador

## 7. ESTRUTURA DE VAULTS

Cada deployment HAOS deve definir suas próprias vaults com funções separadas:

| Vault | Função |
|-------|--------|
| **Vault Principal** | Documentação técnica geral, resumos de correções, knowledge base |
| **Vault Tarefas** | Registro de todas as tarefas concluídas |
| **Vault Projetos** | Registro de todos os projetos concluídos |
| **Vault Pessoal** | Dados do operador — acesso restrito |

Os paths concretos de cada vault são definidos pelo operador no arquivo `USER.md` ou `HAOS_EXECUTION_STORAGE_RULES.md` do ambiente privado.

## 8. PASTA PADRÃO DE SALVAMENTO

Arquivos, documentos, planilhas, imagens e entregáveis devem ser salvos na pasta raiz do projeto, organizados em subpastas corretas.

Regras:
- Nunca salvar solto
- Sempre organizar em subpastas corretas
- Sempre nomear com padrão: `YYYYMMDD_nome-projeto_descricao`

Exemplo:
`210326_haos-openclaw_setup-completo.md`

## 9. PROIBIÇÕES
- Não usar a vault errada por inferência
- Não fazer commit fora de correção sem pedido explícito
- Não publicar conteúdo sensível no repositório público
- Não salvar arquivos soltos fora de estrutura
- Não presumir escopo se houver dúvida
- Nunca expor valores de credenciais no chat

## 10. GATILHOS DE PERGUNTA OBRIGATÓRIA
Se o pedido mencionar algo como:
- "faz os commits"
- "atualiza a vault"
- "segue o padrão"
- "documenta isso"
- "salva isso"

e o escopo não estiver 100% claro, perguntar antes de agir.

## 11. CHECKLIST DE FECHAMENTO OBRIGATÓRIO (NÃO NEGOCIÁVEL)
Uma tarefa só pode ser considerada concluída quando os 3 itens abaixo forem feitos:

1. Entrega validada
2. Registro na vault correta (com caminho completo do arquivo)
3. Confirmação final no chat contendo o caminho do registro

Regra: se qualquer item do checklist faltar, a tarefa permanece em aberto.
