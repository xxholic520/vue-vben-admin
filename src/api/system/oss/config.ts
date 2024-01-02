import { defHttp } from '@/utils/http/axios';
import { OssConfig } from './types';
import { PageQuery } from '@/api/model/baseModel';

enum Api {
  root = '/resource/oss/config',
  ossConfigList = '/resource/oss/config/list',
  ossConfigChangeStatus = '/resource/oss/config/changeStatus',
}

export function ossConfigList(params: PageQuery) {
  return defHttp.get<OssConfig[]>({ url: Api.ossConfigList, params });
}

export function ossConfigInfo(ossConfigId: string | number) {
  return defHttp.get<OssConfig>({ url: Api.root + '/' + ossConfigId });
}

export function ossConfigAdd(data: any) {
  return defHttp.post<void>({ url: Api.root, data }, { successMessageMode: 'message' });
}

export function ossConfigUpdate(data: any) {
  return defHttp.put<void>({ url: Api.root, data }, { successMessageMode: 'message' });
}

export function ossConfigRemove(ossConfigIds: (string | number)[]) {
  return defHttp.delete<void>(
    { url: Api.root + '/' + ossConfigIds },
    { successMessageMode: 'message' },
  );
}

export function ossConfigChangeStatus(data: any) {
  return defHttp.put({ url: Api.ossConfigChangeStatus, data }, { successMessageMode: 'message' });
}
