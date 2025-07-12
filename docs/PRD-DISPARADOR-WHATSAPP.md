# PRD – Disparador de Mensagens WhatsApp

## 1. Visão Geral
Aplicação web simples para disparo de mensagens WhatsApp via webhook para o n8n. O foco é uma interface intuitiva, responsiva e visualmente agradável, baseada em Next.js 14, ShadCN UI, TailwindCSS e fonte Inter. O backend de disparo será o n8n, recebendo um JSON estruturado.

## 2. Requisitos Funcionais
- Visualizar contatos em formato de tabela (nome, telefone, opção de remover).
- Adicionar contato manualmente (nome e telefone).
- Visualizar um preview da mensagem a ser disparada, com variáveis substituídas (ex: {{nome}}).
- Disparar mensagem para todos os contatos listados (POST para webhook n8n).
- Feedback visual de sucesso/erro (toast ou alerta).
- Resetar lista de contatos.

## 3. Requisitos Não Funcionais
- Interface responsiva (desktop/mobile).
- Design alinhado à imagem de referência (cores, espaçamento, fonte Inter).
- Utilizar componentes ShadCN UI para tabela, formulário, botão, alerta, toast, etc.
- Código em TypeScript estrito.
- Validação de telefone e nome (ex: Zod).

## 4. Fluxo do Usuário
1. Usuário acessa a página do disparador.
2. Adiciona contatos manualmente (nome, telefone) – cada novo contato aparece na tabela.
3. Visualiza o preview da mensagem personalizada.
4. Clica em "Disparar Mensagem".
5. Recebe feedback visual de sucesso ou erro.
6. Pode remover contatos individualmente ou resetar a lista.

## 5. Payload do Webhook (POST)
Endpoint: `https://webhookn8n.mage.technology/webhook/mage-disparos`

```json
{
  "message_template": "Olá {{nome}} tudo bem contigo? essa é uma mensagem disparada pelo disparador mage disparos",
  "body": {
    "contacts": [
      { "nome": "Sara", "telefone": "556196294707" },
      { "nome": "Naoki", "telefone": "556198933145" }
    ]
  }
}
```

## 6. Incrementos Sugeridos (Futuros)
- Upload de contatos via CSV.
- Edição inline de contatos na tabela.
- Customização do template da mensagem.
- Confirmação de envio (modal).
- Paginação para listas grandes.
- Avatar/iniciais dos contatos.

## 7. Referências Visuais
- Fonte: Inter (importar via Google Fonts ou npm).
- Cores: basear-se na imagem fornecida (tons claros, azul, cinza, branco, preto para texto principal).
- Componentização: seguir padrão ShadCN UI.

---

**Observações:**
- O MVP deve ser simples, funcional e fácil de evoluir.
- O backend de disparo (n8n) não faz parte deste escopo, apenas a interface e o POST do webhook. 