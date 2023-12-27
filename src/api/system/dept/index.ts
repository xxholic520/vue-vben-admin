import { defHttp } from '@/utils/http/axios';
import { DeptVO, DeptForm, DeptQuery, DeptListGetResultModel } from '@/api/system/dept/types';

/**
 * 查询部门列表
 * @param query
 * @returns {*}
 */
export function getDeptList(query?: DeptQuery) {
  return defHttp.get<DeptListGetResultModel>({ url: '/system/dept/list', params: query });
}

/**
 * 查询部门详细
 * @param deptId
 */
export function getDeptById(deptId: string | number) {
  return defHttp.get<DeptVO>({ url: '/system/dept/' + deptId, method: 'get' });
}

/**
 * 新增部门
 * @param data
 */
export function createDept(data: DeptForm) {
  return defHttp.post({ url: '/system/dept', data }, { successMessageMode: 'message' });
}

/**
 * 修改部门
 * @param data
 */
export function updateDept(data: DeptForm) {
  return defHttp.put({ url: '/system/dept', data }, { successMessageMode: 'message' });
}

/**
 * 删除部门
 * @param deptId
 */
export function removeDept(deptId: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/system/dept/' + deptId }, { successMessageMode: 'message' });
}
