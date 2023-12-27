import { defHttp } from '@/utils/http/axios';
import { OperLogListGetResultModel, OperLogQuery } from './types';
import { isArray } from 'lodash-es';

export function getOperlogList(query?: OperLogQuery) {
  return defHttp.get<OperLogListGetResultModel>({ url: '/monitor/operlog/list', params: query });
}

export function cleanOperLog() {
  return defHttp.delete({ url: '/monitor/operlog/clean' }, { successMessageMode: 'message' });
}

export function batchRemoveOperLog(operIds: string | number | string[] | number[]) {
  if (isArray(operIds)) {
    operIds = operIds.join(',');
  }
  return defHttp.delete({ url: `/monitor/operlog/${operIds}` }, { successMessageMode: 'message' });
}

export function exportOperLog(query?: OperLogQuery) {
  return defHttp.post(
    {
      url: '/monitor/operlog/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isReturnNativeResponse: true },
  );
}
