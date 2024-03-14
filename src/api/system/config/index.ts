import { defHttp } from '@/utils/http/axios';
import { ConfigListGetResultModel, ConfigQuery, SysConfigVo } from './types';
import { isArray } from 'lodash-es';

type Key = string | number;

export function getConfigList(query?: ConfigQuery) {
  return defHttp.get<ConfigListGetResultModel>({ url: '/system/config/list', params: query });
}

export function createConfig(data: SysConfigVo) {
  return defHttp.post({ url: '/system/config', data }, { successMessageMode: 'message' });
}

export function updateConfig(data: SysConfigVo) {
  return defHttp.put({ url: '/system/config', data }, { successMessageMode: 'message' });
}

export function removeConfig(configIds: Key | Key[]) {
  if (isArray(configIds)) {
    configIds = configIds.join(',');
  }
  return defHttp.delete({ url: `/system/config/${configIds}` });
}

export function exportConfig(query?: ConfigQuery) {
  return defHttp.post(
    {
      url: '/system/config/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isReturnNativeResponse: true },
  );
}

export function getConfigById(configId: number | string) {
  return defHttp.get<SysConfigVo>({ url: `/system/config/${configId}` });
}

export function refreshConfig() {
  return defHttp.delete({ url: '/system/config/refreshCache' });
}

export function getConfigByKey(configKey: string) {
  return defHttp.get(
    { url: `/system/config/configKey/${configKey}` },
    { isTransformResponse: false },
  );
}
