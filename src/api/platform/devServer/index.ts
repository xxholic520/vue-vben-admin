import { defHttp } from '@/utils/http/axios';
import {
  DevServerVO,
  DevServerForm,
  DevServerQuery,
  DevServerListGetResultModel,
} from '@/api/platform/devServer/types';

/**
 * 查询设备服务列表
 * @param query
 * @returns {*}
 */
export function getDevServerList(query?: DevServerQuery) {
  return defHttp.get<DevServerListGetResultModel>({
    url: '/platform/devServer/list',
    params: query,
  });
}

/**
 * 查询设备服务详细
 * @param id
 */
export function getDevServerById(id: string | number) {
  return defHttp.get<DevServerVO>({ url: '/platform/devServer/' + id, method: 'get' });
}

/**
 * 新增设备服务
 * @param data
 */
export function createDevServer(data: DevServerForm) {
  return defHttp.post({ url: '/platform/devServer', data }, { successMessageMode: 'message' });
}

/**
 * 修改设备服务
 * @param data
 */
export function updateDevServer(data: DevServerForm) {
  return defHttp.put({ url: '/platform/devServer', data }, { successMessageMode: 'message' });
}

/**
 * 删除设备服务
 * @param id
 */
export function removeDevServer(id: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/platform/devServer/' + id }, { successMessageMode: 'message' });
}

/**
 * 导出设备服务
 * @param query
 */
export function exportDevServer(query?: DevServerQuery) {
  return defHttp.post(
    {
      url: '/platform/devServer/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isReturnNativeResponse: true },
  );
}

export function getDevServerOptions() {
  return defHttp.get<DevServerVO[]>({ url: '/platform/devServer/optionselect' });
}
