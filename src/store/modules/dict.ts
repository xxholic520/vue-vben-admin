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
        for (let i = 0; i < this.$state.length; i++) {
          if (this.$state[i].key === key) {
            return this.$state[i].value;
          }
        }
      } catch (error) {
        return null;
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
