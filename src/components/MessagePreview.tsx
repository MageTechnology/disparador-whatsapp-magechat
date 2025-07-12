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
  const previewContact = contacts[0];

  function renderMessage(nome: string) {
    return template.replace("{{nome}}", nome);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview da Mensagem</CardTitle>
        <CardDescription>
          Veja como a mensagem será enviada para o primeiro contato:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="p-2 rounded bg-muted">
          <span className="font-semibold">{previewContact.nome}:</span> {renderMessage(previewContact.nome)}
        </div>
      </CardContent>
    </Card>
  );
}