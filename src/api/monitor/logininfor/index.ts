import { defHttp } from '@/utils/http/axios';
import { LoginInfoQuery, LoginInfoListGetResultModel } from './types';
import { isArray } from 'lodash-es';

export function getLoginInfoList(query?: LoginInfoQuery) {
  return defHttp.get<LoginInfoListGetResultModel>({
    url: '/monitor/logininfor/list',
    params: query,
  });
}

export function cleanLogininfor() {
  return defHttp.delete({ url: '/monitor/logininfor/clean' }, { successMessageMode: 'message' });
}

export function batchRemoveLogininfor(infoIds: string | number | string[] | number[]) {
  if (isArray(infoIds)) {
    infoIds = infoIds.join(',');
  }
  return defHttp.delete(
    { url: `/monitor/logininfor/${infoIds}` },
    { successMessageMode: 'message' },
  );
}

export function unlockUser(userName: string) {
  return defHttp.get({ url: `/monitor/logininfor/unlock/${userName}` });
}

export function exportLogininfor(query?: LoginInfoQuery) {
  return defHttp.post(
    {
      url: '/monitor/logininfor/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isReturnNativeResponse: true },
  );
}
