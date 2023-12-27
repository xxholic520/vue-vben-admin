import { getDictDataByType } from '@/api/system/dict/data';
import { useDictStore } from '@/store/modules/dict';
import { Ref, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';

export interface DictDataOption {
  label: string;
  value: string;
  tagClass: string;
}

export const useDict = (...args: string[]): Ref<{ [key: string]: DictDataOption[] }> => {
  const { state } = useAsyncState<{ [key: string]: DictDataOption[] }>(async () => {
    const res = ref<{ [key: string]: DictDataOption[] }>({});
    args.forEach(async (dictType) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        const datas = await getDictDataByType(dictType);
        res.value[dictType] = datas.map((v) => ({
          label: v.dictLabel,
          value: v.dictValue,
          tagClass: v.listClass || 'default',
        }));
        useDictStore().setDict(dictType, res.value[dictType]);
      }
    });
    return Promise.resolve(res.value);
  }, {});
  return state;
};

export const selectDictLabel = (datas: any, value: number | string) => {
  if (value === undefined) {
    return '';
  }
  const actions: any[] = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
};
