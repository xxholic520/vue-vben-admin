import { defineStore } from 'pinia';
import { store } from '@/store';
import { DictDataOption } from '@/utils/helper/dictHelper';

interface DictState {
  key: string;
  value: DictDataOption[];
}

export const useDictStore = defineStore({
  id: 'app-dict',
  state: (): DictState[] => [],
  actions: {
    setDict(key: string, value: DictDataOption[]) {
      if (key !== null && key !== '') {
        this.$state.push({ key, value });
      }
    },
    getDict(key: string) {
      if (key === null && key == '') {
        return null;
      }
      try {
        return this.$state.find((item) => item.key === key)?.value;
      } catch (error) {
        //
      }
      return null;
    },
    cleanDict() {
      this.$state = [];
    },
  },
});

export function useDictStoreWithOut() {
  return useDictStore(store);
}
