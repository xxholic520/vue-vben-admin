import { defHttp } from '@/utils/http/axios';
import {
  DeviceVO,
  DeviceForm,
  DeviceQuery,
  DeviceListGetResultModel,
} from '@/api/platform/device/types';

/**
 * 查询设备管理列表
 * @param query
 * @returns {*}
 */
export function getDeviceList(query?: DeviceQuery) {
  return defHttp.get<DeviceListGetResultModel>({ url: '/platform/device/list', params: query });
}

/**
 * 查询设备管理详细
 * @param id
 */
export function getDeviceById(id: string | number) {
  return defHttp.get<DeviceVO>({ url: '/platform/device/' + id, method: 'get' });
}

/**
 * 新增设备管理
 * @param data
 */
export function createDevice(data: DeviceForm) {
  return defHttp.post({ url: '/platform/device', data }, { successMessageMode: 'message' });
}

/**
 * 修改设备管理
 * @param data
 */
export function updateDevice(data: DeviceForm) {
  return defHttp.put({ url: '/platform/device', data }, { successMessageMode: 'message' });
}

/**
 * 删除设备管理
 * @param id
 */
export function removeDevice(id: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/platform/device/' + id }, { successMessageMode: 'message' });
}

/**
 * 导出设备管理
 * @param query
 */
export function exportDevice(query?: DeviceQuery) {
  return defHttp.post<Blob>(
    {
      url: '/platform/device/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}
