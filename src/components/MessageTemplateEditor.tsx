"use client";

import { Textarea } from "@/components/ui/textarea";
import { useMessageTemplateStore } from "@/hooks/useMessageTemplateStore";

export function MessageTemplateEditor() {
  const template = useMessageTemplateStore((s) => s.template);
  const setTemplate = useMessageTemplateStore((s) => s.setTemplate);

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="font-medium">
        Mensagem a ser enviada (você pode usar variáveis como <span className="bg-muted px-1 rounded">{'{{nome}}'}</span> se desejar):
      </label>
      <Textarea
        value={template}
        onChange={e => setTemplate(e.target.value)}
        rows={3}
        className="resize-none"
        placeholder="Exemplo: Olá {{nome}}, tudo bem?"
      />
    </div>
  );
} 