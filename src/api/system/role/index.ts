import { defHttp } from '@/utils/http/axios';
import { RoleVO, RoleForm, RoleQuery, RoleListGetResultModel } from '@/api/system/role/types';

/**
 * 查询角色信息列表
 * @param query
 * @returns {*}
 */
export function getRoleList(query?: RoleQuery) {
  return defHttp.get<RoleListGetResultModel>({ url: '/system/role/list', params: query });
}

/**
 * 查询角色信息详细
 * @param roleId
 */
export function getRoleById(roleId: string | number) {
  return defHttp.get<RoleVO>({ url: '/system/role/' + roleId, method: 'get' });
}

/**
 * 新增角色信息
 * @param data
 */
export function createRole(data: RoleForm) {
  return defHttp.post({ url: '/system/role', data }, { successMessageMode: 'message' });
}

/**
 * 修改角色信息
 * @param data
 */
export function updateRole(data: RoleForm) {
  return defHttp.put({ url: '/system/role', data }, { successMessageMode: 'message' });
}

/**
 * 删除角色信息
 * @param roleId
 */
export function removeRole(roleId: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/system/role/' + roleId }, { successMessageMode: 'message' });
}

/**
 * 导出角色信息
 * @param query
 */
export function exportRole(query?: RoleQuery) {
  return defHttp.post<Blob>(
    {
      url: '/system/role/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}

export function changeRoleStatus(data: RoleForm) {
  const { roleId, status } = data;
  return defHttp.put(
    { url: '/system/role/changeStatus', data: { roleId, status } },
    { successMessageMode: 'message' },
  );
}

export function roleDataScope(data: RoleForm) {
  return defHttp.put({ url: '/system/role/dataScope', data }, { successMessageMode: 'message' });
}

export function getRoleDeptTree(roleId: string | number) {
  return defHttp.get({ url: `/system/role/deptTree/${roleId}` });
}

export function roleAllocatedList(query?: any) {
  return defHttp.get({ url: '/system/role/authUser/allocatedList', params: query });
}

export function roleUnallocatedList(query?: any) {
  return defHttp.get({ url: '/system/role/authUser/unallocatedList', params: query });
}

export function roleAuthCancel(data: any) {
  return defHttp.put(
    { url: '/system/role/authUser/cancel', data },
    { successMessageMode: 'message' },
  );
}

export function roleAuthCancelAll(roleId: string | number, userIds: (string | number)[]) {
  return defHttp.put(
    { url: '/system/role/authUser/cancelAll', params: { roleId, userIds: userIds.join(',') } },
    { successMessageMode: 'message' },
  );
}

export function roleSelectAll(roleId: string | number, userIds: (string | number)[]) {
  return defHttp.put(
    // { url: `/system/role/authUser/selectAll?roleId=${roleId}&userIds=${userIds.join(',')}` },
    { url: '/system/role/authUser/selectAll', params: { roleId, userIds: userIds.join(',') } },
    { successMessageMode: 'message' },
  );
}
