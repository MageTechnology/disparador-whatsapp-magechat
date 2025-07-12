import { create } from 'zustand';

interface MessageTemplateStore {
  template: string;
  setTemplate: (t: string) => void;
}

const DEFAULT_TEMPLATE = "Olá {{nome}} tudo bem contigo? essa é uma mensagem disparada pelo disparador mage disparos";

export const useMessageTemplateStore = create<MessageTemplateStore>((set) => ({
  template: DEFAULT_TEMPLATE,
  setTemplate: (t) => set({ template: t }),
})); 