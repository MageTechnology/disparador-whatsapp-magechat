"use client";

import { useContactsStore } from "@/hooks/useContactsStore";
import { useMessageTemplateStore } from "@/hooks/useMessageTemplateStore";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function MessagePreview() {
  const contacts = useContactsStore((s) => s.contacts);
  const template = useMessageTemplateStore((s) => s.template); // <-- hook chamado no topo

  if (contacts.length === 0) {
    return <div className="text-muted-foreground text-center py-4">Nenhum contato para pré-visualizar.</div>;
  }
  const previewContacts = contacts.slice(0, 3);
  const remaining = contacts.length - previewContacts.length;

  function renderMessage(nome: string) {
    return template.replace("{{nome}}", nome);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview da Mensagem</CardTitle>
        <CardDescription>
          Veja como a mensagem será enviada para os contatos:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {previewContacts.map((c) => (
          <div key={c.telefone} className="p-2 rounded bg-muted">
            <span className="font-semibold">{c.nome}:</span> {renderMessage(c.nome)}
          </div>
        ))}
        {remaining > 0 && (
          <div className="text-xs text-muted-foreground mt-2">
            ...e mais {remaining} contato(s)
          </div>
        )}
      </CardContent>
    </Card>
  );
}