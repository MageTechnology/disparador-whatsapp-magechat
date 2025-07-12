import { create } from 'zustand';

export type Contact = {
  nome: string;
  telefone: string;
  media?: {
    type: string; // MIME type
    filename: string;
    url: string; // inicialmente vazio
    data: string; // base64
    caption?: string; // legenda opcional
  };
};

interface ContactsStore {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (telefone: string) => void;
  resetContacts: () => void;
}

export const useContactsStore = create<ContactsStore>((set) => ({
  contacts: [],
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),
  removeContact: (telefone) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.telefone !== telefone),
    })),
  resetContacts: () => set({ contacts: [] }),
})); 