"use client";

import { useState } from "react";
import { AddContactsBulkForm } from "@/components/AddContactForm";
import { ContactsTable } from "@/components/ContactsTable";
import { MessagePreview } from "@/components/MessagePreview";
import { MessageTemplateEditor } from "@/components/MessageTemplateEditor";
import { MediaUpload, MediaFile } from "@/components/MediaUpload";
import { useContactsStore } from "@/hooks/useContactsStore";
import { useMessageTemplateStore } from "@/hooks/useMessageTemplateStore";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const contacts = useContactsStore((s) => s.contacts);
  const resetContacts = useContactsStore((s) => s.resetContacts);
  const template = useMessageTemplateStore((s) => s.template);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<MediaFile | null>(null);

  async function handleSend() {
    if (contacts.length === 0) {
      toast.error("Adicione pelo menos um contato antes de disparar.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://webhookn8n.mage.technology/webhook/mage-disparos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_template: template,
          media: media || undefined,
          contacts: contacts,
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar para o webhook");
      toast.success("Mensagens disparadas com sucesso!");
      resetContacts();
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message || "Erro ao disparar mensagem");
      } else {
        toast.error("Erro ao disparar mensagem");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f8fa] p-4 sm:p-8">
      <Toaster />
      <h1 className="text-3xl font-semibold mb-8 text-[#222] tracking-tight">Disparador WhatsApp</h1>
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <MessageTemplateEditor />
        {/* Seção de upload de mídia */}
        <section className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-6">
          <h2 className="text-lg font-semibold mb-2 text-[#222]">Adicionar Mídia (opcional)</h2>
          <MediaUpload onMediaSelected={setMedia} />
          {media && (
            <div className="text-xs text-muted-foreground mt-1">
              Arquivo selecionado: {media.filename} ({media.type})
              {media.caption && <div>Legenda: {media.caption}</div>}
            </div>
          )}
        </section>
        {/* Formulário para adicionar contato */}
        <section className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-6">
          <h2 className="text-lg font-semibold mb-2 text-[#222]">Adicionar Contato</h2>
          <AddContactsBulkForm />
        </section>
        {/* Preview da mensagem */}
        <section className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-6">
          <h2 className="text-lg font-semibold mb-2 text-[#222]">Preview da Mensagem</h2>
          <MessagePreview />
        </section>
        {/* Tabela de contatos */}
        <section className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-6">
          <h2 className="text-lg font-semibold mb-2 text-[#222]">Contatos</h2>
          <ContactsTable />
        </section>
        {/* Botão de disparo */}
        <div className="flex justify-end">
          <button
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-xl font-medium shadow transition disabled:opacity-50"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Disparar Mensagem"}
          </button>
        </div>
      </div>
    </div>
  );
}
