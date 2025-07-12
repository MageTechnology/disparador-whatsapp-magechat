"use client";

import { useState } from "react";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContactsStore, Contact } from "@/hooks/useContactsStore";
import Papa, { ParseResult } from "papaparse";

const contactSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  telefone: z
    .string()
    .min(8, "Telefone obrigatório")
    .regex(/^\d{10,15}$/, "Telefone deve conter apenas números (10-15 dígitos)")
});

// Removido: agora usamos o tipo Contact do store

export function AddContactsBulkForm() {
  const addContact = useContactsStore((s) => s.addContact);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  function normalizePhone(phone: string): string {
    return phone.replace(/[^\d]/g, "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);
    const lines = value.split("\n").map((l) => l.trim()).filter(Boolean);
    const validContacts: Contact[] = [];
    const errorLines: string[] = [];
    lines.forEach((line, idx) => {
      const [nome, telefoneRaw] = line.split(",").map((s) => s.trim());
      const telefone = normalizePhone(telefoneRaw);
      const result = contactSchema.safeParse({ nome, telefone });
      if (result.success) {
        validContacts.push(result.data);
      } else {
        errorLines.push(`Linha ${idx + 1}: ${result.error.issues.map(issue => issue.message).join(", ")}`);
      }
    });
    if (validContacts.length > 0) {
      validContacts.forEach(addContact);
      setSuccess(`${validContacts.length} contato(s) adicionados com sucesso!`);
      setValue("");
    }
    if (errorLines.length > 0) {
      setErrors(errorLines);
    }
  }

  function handleCsvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors([]);
    setSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results: ParseResult<string[]>) => {
        const validContacts: Contact[] = [];
        const errorLines: string[] = [];
        results.data.forEach((row, idx) => {
          if (row.length < 2) {
            errorLines.push(`Linha ${idx + 1}: Formato inválido (esperado: nome,telefone)`);
            return;
          }
          const [nome, telefoneRaw] = row.map((s) => String(s).trim());
          const telefone = normalizePhone(telefoneRaw);
          const result = contactSchema.safeParse({ nome, telefone });
          if (result.success) {
            validContacts.push(result.data);
          } else {
            errorLines.push(`Linha ${idx + 1}: ${result.error.issues.map((issue) => issue.message).join(", ")}`);
          }
        });
        if (validContacts.length > 0) {
          validContacts.forEach(addContact);
          setSuccess(`${validContacts.length} contato(s) adicionados via CSV!`);
        }
        if (errorLines.length > 0) {
          setErrors(errorLines);
        }
      },
      error: (err: Error) => {
        setErrors([`Erro ao ler CSV: ${err.message}`]);
      },
    });
    // Limpa o input para permitir reupload do mesmo arquivo
    e.target.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="font-medium">Cole os contatos (um por linha, nome e telefone separados por vírgula):</label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Exemplo:\nSara,556196294707\nNaoki,556198933145`}
        rows={5}
        className="resize-none"
      />
      <div className="flex items-center gap-2">
        <Button asChild type="button" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl font-medium shadow transition">
          <label>
            Upload CSV
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>
        </Button>
        <Button type="submit" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl font-medium shadow transition self-end">Adicionar contatos</Button>
      </div>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {errors.length > 0 && (
        <ul className="text-red-600 text-sm list-disc pl-5">
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
    </form>
  );
} 