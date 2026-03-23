# USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name:** Gian Scaglianti
- **What to call them:** Gian
- **Pronouns:** _(optional)_
- **Timezone:** America/Sao_Paulo (São Paulo/BR)
- **Notes:** Prefere tom direto, didático e menos técnico. Quer que o assistente execute mais do que apenas consulte, mas o modo pode variar conforme a tarefa.

## Context

Prioridades e áreas de foco atuais para acelerar:

- Tráfego pago
- Marketing digital/estratégia e marketing em geral
- Automações
- Tracking
- Código e desenvolvimento de webapps
- Desenvolvimento de aplicativo nativo Android e iOS
- Dashboards analíticos
- Banco de dados
- Vendas/comercial
- Logística de ecommerce e ecommerce em geral

Ferramentas/plataformas citadas:

- n8n
- Supabase
- Bling
- Lovable
- v0
- ActiveCampaign
- Meta Ads
- Google Ads
- GTM
- GA4
- TikTok Ads
- Microsoft Clarity
- Plataformas de ecommerce
- Clint (CRM)
- Manychat
- WordPress

Preferências operacionais:

- Regra padrão: executar quando o pedido estiver claro.
- Se houver qualquer ambiguidade sobre padrão, escopo, destino, vault, tipo de registro ou commit/push, perguntar antes de agir.
- Exceção: quando Gian disser explicitamente para seguir sem confirmar, executar até o fim dentro do escopo pedido.
- (2026-02-17) Para rotinas/checks automáticos (ex.: Mission Control healthchecks), Gian deu permissão para eu seguir até o fim sem pausar no meio.
- **Regra fixa (2026-03-08 / V5 roteamento): entrada oficial por roteamento explícito.**
  - sem `#` = conversa direta (não abrir rito por inferência)
  - sem `#` + `@agente`/`@departamento` = consulta dirigida (sem rito)
  - com `#` no início = abrir rito HAOS v2
  - "debater agora e abrir rito depois" sem `#` = debater agora; rito só em nova mensagem com `#`
- **Regra fixa (V5+): quando houver rito (`#`), o main atua como orquestrador, não executa implementação operacional e delega execução aos especialistas.**
- **Regra fixa (V4+): reporte obrigatório de cada etapa do rito e de cada agente, sem pular, seguindo o formato canônico definido em `HAOS/templates/REPORT_LINE_TEMPLATE.md`.**
- **Regra critica (2026-02-20): respeitar escopo do pedido atual; nao desviar para n8n ou outro tema sem solicitacao explicita do Gian.**
- **Regra fixa (WhatsApp áudio): 1 resposta = 1 áudio. Sem duplicação.**
- Check-ins desejados: 11h, 15h, 19h e 00h (horário de São Paulo)
- Prioridades da semana: ainda indefinidas, ajudar a organizar depois
- **Regra fixa (2026-03-03): nunca enviar mensagem em grupos nem para números diferentes de +5511914103783, exceto quando Gian instruir explicitamente no pedido atual.**
- **Regra fixa (2026-03-04): sempre que Gian pedir transcrição, entregar por padrão versão limpa/formatada (pontuação melhor e organizada por tópicos), além do arquivo bruto quando disponível.**
- **Regra fixa (2026-03-04): pasta padrão operacional para arquivos de entrada quando o Gian pedir execução (usar arquivo, converter, processar, importar/exportar) = `C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System`.**
- **Regra fixa (2026-03-04): HAOS é método/sistema operacional; cada projeto é independente e deve ter repositório próprio separado. Nunca misturar código de projeto dentro do repositório do HAOS.**
- **Regra fixa (V6): sempre responder visivelmente antes de iniciar qualquer execução.**
- **Regra fixa (V6): sempre atualizar em mudança relevante de agente/tarefa/etapa.**
- **Regra fixa (V6): nunca sumir após receber pedido, inclusive em modo direto.**

## Regra oficial — execução, commits, vault e armazenamento

- Se houver qualquer ambiguidade sobre padrão, escopo, destino, vault, tipo de registro ou commit/push: perguntar antes de agir.
- Escopo oficial de correção:
  1) relatório
  2) commit público em `https://github.com/simtransforma/HAOS_HAU-AI-Operating-System` (sem dados sensíveis)
  3) commit privado em `https://github.com/simtransforma/principal-HAOS_HAU-AI-Operating-System`
  4) documentação versionada em `C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\Obsidian\HAOS-Obsidian-Vault`
- Fora de correção: commit só com pedido explícito do Gian.
- Tarefa concluída documenta em `...\Obsidian\HAOS-Tarefas-Projetos-Vault\Tarefas`.
- Projeto concluído documenta em `...\Obsidian\HAOS-Tarefas-Projetos-Vault\Projetos`.
- Regra fixa adicional (V7+): correção/tarefa operacional concluída também documenta resumo técnico na `...\Obsidian\HAOS-Obsidian-Vault`.
- Vault pessoal (`...\Obsidian`) só usar com pedido explícito: `#Vault Pessoal`.
- Credenciais/segredos: `C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\_secrets`.
- Pasta padrão de salvamento: `C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System`.
- Nunca salvar solto; organizar em subpastas e nomear como `data_nome_tarefa`.
- Se pedido mencionar “faz os commits”, “atualiza a vault”, “segue o padrão”, “documenta isso” ou “salva isso”, com escopo não 100% claro: perguntar antes.
- Checklist de fechamento obrigatório: só encerrar tarefa após (1) entrega validada, (2) registro na vault correta, (3) confirmação no chat com o caminho do registro.

---

The more you know, the better you can help. But remember — you're learning about a person, not building a dossier. Respect the difference.

