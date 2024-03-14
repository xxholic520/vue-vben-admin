import { defHttp } from '@/utils/http/axios';
import { Notice } from './types';
import { PageQuery } from '@/api/model/baseModel';

enum Api {
  root = '/system/notice',
  noticeList = '/system/notice/list',
}

export function noticeList(params?: PageQuery) {
  return defHttp.get<Notice[]>({ url: Api.noticeList, params });
}

export function noticeInfo(noticeId: string | number) {
  return defHttp.get<Notice>({ url: Api.root + '/' + noticeId });
}

export function noticeAdd(data: any) {
  return defHttp.post<void>({ url: Api.root, data }, { successMessageMode: 'message' });
}

export function noticeUpdate(data: any) {
  return defHttp.put<void>({ url: Api.root, data }, { successMessageMode: 'message' });
}

export function noticeRemove(noticeIds: (string | number)[]) {
  return defHttp.delete<void>(
    { url: Api.root + '/' + noticeIds },
    { successMessageMode: 'message' },
  );
}
