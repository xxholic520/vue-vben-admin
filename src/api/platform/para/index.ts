import { defHttp } from '@/utils/http/axios';
import { ParaVO, ParaForm, ParaQuery, ParaListGetResultModel } from '@/api/platform/para/types';

/**
 * 查询参数设置列表
 * @param query
 * @returns {*}
 */
export function getParaList(query?: ParaQuery) {
  return defHttp.get<ParaListGetResultModel>({ url: '/platform/para/list', params: query });
}

/**
 * 查询参数设置详细
 * @param id
 */
export function getParaById(id: string | number) {
  return defHttp.get<ParaVO>({ url: '/platform/para/' + id, method: 'get' });
}

/**
 * 新增参数设置
 * @param data
 */
export function createPara(data: ParaForm) {
  return defHttp.post({ url: '/platform/para', data }, { successMessageMode: 'message' });
}

/**
 * 修改参数设置
 * @param data
 */
export function updatePara(data: ParaForm) {
  return defHttp.put({ url: '/platform/para', data }, { successMessageMode: 'message' });
}

/**
 * 删除参数设置
 * @param id
 */
export function removePara(id: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/platform/para/' + id }, { successMessageMode: 'message' });
}

/**
 * 导出参数设置
 * @param query
 */
export function exportPara(query?: ParaQuery) {
  return defHttp.post<Blob>(
    {
      url: '/platform/para/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}

export function getParaGroupOptions() {
  return defHttp.get<ParaVO[]>({ url: '/platform/para/para-group-options' });
}
