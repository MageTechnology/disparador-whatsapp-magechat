"use client";

import { useContactsStore } from "@/hooks/useContactsStore";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function ContactsTable() {
  const contacts = useContactsStore((s) => s.contacts);
  const removeContact = useContactsStore((s) => s.removeContact);

  if (contacts.length === 0) {
    return <div className="text-muted-foreground text-center py-4">Nenhum contato adicionado.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead className="w-16 text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((c) => (
          <TableRow key={c.telefone}>
            <TableCell>{c.nome}</TableCell>
            <TableCell>{c.telefone}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeContact(c.telefone)}
              >
                Remover
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 