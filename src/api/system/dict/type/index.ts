import { defHttp } from '@/utils/http/axios';
import { DictTypeListGetResultModel, DictTypeQuery, SysDictTypeVo } from './types';
import { isArray } from 'lodash-es';

// 查询字典类型列表
export function getDictTypeList(query?: DictTypeQuery) {
  return defHttp.get<DictTypeListGetResultModel>({ url: '/system/dict/type/list', params: query });
}

// 新增字典类型
export function createDictType(data: SysDictTypeVo) {
  return defHttp.post({ url: '/system/dict/type', data }, { successMessageMode: 'message' });
}

// 修改字典类型
export function updateDictType(data: SysDictTypeVo) {
  return defHttp.put({ url: '/system/dict/type', data }, { successMessageMode: 'message' });
}

// 删除字典类型
export function removeDictType(dictIds: string | number | string[] | number[]) {
  if (isArray(dictIds)) {
    dictIds = dictIds.join(',');
  }
  return defHttp.delete({ url: `/system/dict/type/${dictIds}` }, { successMessageMode: 'message' });
}

// 刷新字典缓存
export function refreshDictCache() {
  return defHttp.delete(
    { url: '/system/dict/type/refreshCache' },
    { successMessageMode: 'message' },
  );
}

// 获取字典选择框列表
export function getDictTypeOptions() {
  return defHttp.get<SysDictTypeVo[]>({ url: '/system/dict/type/optionselect' });
}

// 查询字典数据详细
export function getDictTypeById(dictId: string | number) {
  return defHttp.get<SysDictTypeVo>({ url: `/system/dict/type/${dictId}` });
}

// 导出字典类型列表
export function exportDictType(query?: DictTypeQuery) {
  return defHttp.post<Blob>(
    {
      url: '/system/dict/type/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}
