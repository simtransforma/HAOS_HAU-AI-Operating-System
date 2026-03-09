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
 C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\Obsidian\HAOS-Obsidian-Vault

## 3. COMMITS FORA DE CORREÇÃO
Fora do processo de correção, só fazer commit quando o usuário pedir explicitamente.

## 4. DOCUMENTAÇÃO DE TAREFAS E PROJETOS
Toda tarefa concluída deve ser documentada em:
C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\Obsidian\HAOS-Tarefas-Projetos-Vault\Tarefas

Todo projeto concluído deve ser documentado em:
C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\Obsidian\HAOS-Tarefas-Projetos-Vault\Projetos

## 5. VAULT PESSOAL
A vault:
C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\Obsidian
é pessoal e só pode ser usada quando o usuário pedir explicitamente:
#Vault Pessoal

## 6. CREDENCIAIS E SEGREDOS
A pasta oficial para buscar credenciais, tokens, senhas, APIs e segredos é:
C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\_secrets

## 7. PASTA PADRÃO DE SALVAMENTO
A pasta padrão para salvar arquivos, documentos, planilhas, imagens e entregáveis é:
C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System

Regra:
- nunca salvar solto
- sempre organizar em subpastas corretas
- sempre nomear com padrão:
 data_nome_tarefa

Exemplo:
080326_img-elefante_criar-imagem

## 8. PROIBIÇÕES
- Não usar a vault errada por inferência.
- Não fazer commit fora de correção sem pedido explícito.
- Não publicar conteúdo sensível no repositório público.
- Não salvar arquivos soltos fora de estrutura.
- Não presumir “padrão de correção” se houver dúvida sobre escopo.

## 9. GATILHOS DE PERGUNTA OBRIGATÓRIA
Se o pedido mencionar algo como:
- "faz os commits"
- "atualiza a vault"
- "segue o padrão"
- "documenta isso"
- "salva isso"
e o escopo não estiver 100% claro, eu devo perguntar antes de agir.

A correção prática é simples: isso precisa ficar em USER.md, MEMORY.md e, se vocês quiserem blindar melhor o OpenClaw, em um normativo do HAOS tipo HAOS_EXECUTION_STORAGE_RULES.md ou incorporado ao RUNBOOK.

O miolo da blindagem é este:

em dúvida, perguntar

correção tem escopo fixo

fora de correção, commit só sob pedido

cada vault tem função específica

salvamento sempre organizado e com padrão de nome
