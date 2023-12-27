import { defHttp } from '@/utils/http/axios';
import { DictDataListGetResultModel, DictDataQuery, SysDictDataVo } from './types';

// 根据字典类型查询字典数据信息
export function getDictDataList(query?: DictDataQuery) {
  return defHttp.get<DictDataListGetResultModel>({ url: '/system/dict/data/list', params: query });
}

// 新增字典数据
export function createDictData(data: SysDictDataVo) {
  return defHttp.post({ url: '/system/dict/data', data }, { successMessageMode: 'message' });
}

// 修改字典数据
export function updateDictData(data: SysDictDataVo) {
  return defHttp.put({ url: '/system/dict/data', data }, { successMessageMode: 'message' });
}

// 删除字典数据
export function removeDictData(dictCodes: string | string[]) {
  return defHttp.delete(
    { url: `/system/dict/data/${dictCodes}` },
    { successMessageMode: 'message' },
  );
}

// 导出字典类型列表
export function exportDictData(query?: DictDataQuery) {
  return defHttp.post(
    {
      url: '/system/dict/data/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isReturnNativeResponse: true },
  );
}

export function getDictDataByType(dictType: string) {
  return defHttp.get<SysDictDataVo[]>({ url: `/system/dict/data/type/${dictType}` });
}

export function getDictDataByCode(dictCode: string) {
  return defHttp.get<SysDictDataVo>({ url: `/system/dict/data/${dictCode}` });
}
