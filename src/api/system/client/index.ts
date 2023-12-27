import { defHttp } from '@/utils/http/axios';
import { ClientListResultModel, ClientQuery, SysClientVo } from './types';
import { isArray } from 'lodash-es';

export function getClientList(query?: ClientQuery) {
  return defHttp.get<ClientListResultModel>({ url: '/system/client/list', params: query });
}

export function createClient(data: SysClientVo) {
  return defHttp.post({ url: '/system/client', data }, { successMessageMode: 'message' });
}

export function updateClient(data: SysClientVo) {
  return defHttp.put({ url: '/system/client', data }, { successMessageMode: 'message' });
}

export function removeClient(ids: Key | Key[]) {
  if (isArray(ids)) {
    ids = ids.join(',');
  }
  return defHttp.delete({ url: `/system/client/${ids}` }, { successMessageMode: 'message' });
}

export function exportClient(query?: ClientQuery) {
  return defHttp.post(
    {
      url: '/system/client/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}

export function changeStatus(data: Recordable) {
  return defHttp.put(
    { url: '/system/client/changeStatus', data },
    { successMessageMode: 'message' },
  );
}

export function getClientById(id: Key) {
  return defHttp.get<SysClientVo>({ url: `/system/client/${id}` });
}
