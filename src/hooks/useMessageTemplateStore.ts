import { create } from 'zustand';

interface MessageTemplateStore {
  template: string;
  setTemplate: (t: string) => void;
}

const DEFAULT_TEMPLATE = "";

export const useMessageTemplateStore = create<MessageTemplateStore>((set) => ({
  template: DEFAULT_TEMPLATE,
  setTemplate: (t) => set({ template: t }),
})); 