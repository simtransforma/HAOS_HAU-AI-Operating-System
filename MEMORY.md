## Preferências de comunicação
- Gian prefere explicações **didáticas**, diretas e menos técnicas quando o assunto for complexo; ele não se considera desenvolvedor.

## Preferências operacionais (2026-02-16)
- Gian quer usar **sempre o modelo Codex 5.3** (`openai-codex/gpt-5.3-codex`) quando disponível.
- Gian quer que a **memória inteligente** seja usada por padrão (recall de contexto/memórias antes de responder temas de histórico, decisões e preferências).

## Regra persistente de roteamento (V5 — 2026-03-08)
- `#` no início da mensagem aciona rito HAOS v2.
- Sem `#`, não abrir rito por inferência.
- Sem `#`, com `@agente`/`@departamento`, tratar como consulta dirigida (sem rito).
- Sem `#` e sem `@`, tratar como modo direto quando o pedido estiver claro.
- Se Gian pedir "debater agora e abrir rito depois", respeitar sequência em duas etapas: debate sem rito agora; rito só quando vier nova mensagem com `#`.

## Regras contextuais quando houver rito (`#`)
- Main atua como orquestrador e delega execução operacional aos especialistas.
- Reporte obrigatório por etapa e por agente, seguindo sempre o formato canônico definido em `HAOS/templates/REPORT_LINE_TEMPLATE.md`.
- Manter foco estrito no escopo pedido; não desviar para outro tema sem solicitação explícita.

## Regras fixas complementares
- Regra fixa (2026-03-03): nunca enviar mensagem em grupos nem para números diferentes de +5511914103783, exceto com instrução explícita do Gian no turno atual.
- Regra fixa (2026-03-04): sempre que Gian pedir transcrição, entregar por padrão versão limpa/formatada (pontuação melhor e organizada por tópicos), além do arquivo bruto quando disponível.
- Regra fixa (2026-03-04): pasta padrão operacional para arquivos de entrada quando o Gian pedir execução (usar arquivo, converter, processar, importar/exportar) = `C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System`.
- Regra fixa (2026-03-04): HAOS é método/sistema operacional; projetos devem ficar em repositórios separados. Nunca misturar código de projeto dentro do repositório do HAOS.
- Regra fixa (V6 resposta visível): sempre emitir recibo visível antes de iniciar execução.
- Regra fixa (V6 progresso): atualizar em mudança relevante de agente/tarefa/etapa, bloqueio e conclusão da parte prometida.
- Regra fixa (V6 anti-sumiço): não ficar em silêncio após receber pedido, inclusive em modo direto.
- Regra oficial (execução/commits/vault/armazenamento): em qualquer ambiguidade de padrão/escopo/destino/vault/registro/commit-push, perguntar antes de agir.
- Escopo oficial de correção: relatório + commit público (sem sensíveis) + commit privado + documentação versionada na `HAOS-Obsidian-Vault`.
- Fora de correção: commit só sob pedido explícito.
- Documentação: tarefa concluída em `...\HAOS-Tarefas-Projetos-Vault\Tarefas`; projeto concluído em `...\HAOS-Tarefas-Projetos-Vault\Projetos`.
- Vault pessoal `...\Obsidian` só com comando explícito `#Vault Pessoal`.
- Credenciais oficiais sempre em `_secrets`; salvamento padrão em `HAO IA Operation System`, com organização em subpastas e nome `data_nome_tarefa`.
- Regra fixa de fechamento: tarefa só fecha com entrega validada + registro na vault correta + confirmação final no chat com caminho do registro.
- Regra fixa adicional (V7+): correção/tarefa operacional concluída também deve ter resumo técnico na `HAOS-Obsidian-Vault`, além do registro em Tarefas/Projetos.
