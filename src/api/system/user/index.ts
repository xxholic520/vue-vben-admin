import { defHttp } from '@/utils/http/axios';
import {
  ResetPwdParam,
  UserForm,
  UserInfo,
  UserListGetResultModel,
  UserQuery,
  UserVO,
} from './types';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { DeptQuery, DeptTree } from '../dept/types';

export interface DeptTreeData {
  id: number;
  label: string;
  children?: DeptTreeData[];
}

// 获取用户列表
export function getUserList(query?: UserQuery) {
  return defHttp.get<UserListGetResultModel>({ url: '/system/user/list', params: query });
}

// 新增用户
export function createUser(data: UserForm) {
  return defHttp.post({ url: '/system/user', data }, { successMessageMode: 'message' });
}

// 修改用户
export function updateUser(data: UserForm) {
  return defHttp.put({ url: '/system/user', data }, { successMessageMode: 'message' });
}

//
export function removeUser(userIds: string | number | (string | number)[]) {
  if (Array.isArray(userIds)) {
    userIds = userIds.join(',');
  }
  return defHttp.delete({ url: `/system/user/${userIds}` }, { successMessageMode: 'message' });
}

//
export function userResetPassword(data: ResetPwdParam) {
  return defHttp.put({ url: '/system/user/resetPwd', data }, { successMessageMode: 'message' });
}

//
export function changeUserStatus(data: { userId: string | number; status: string }) {
  return defHttp.put({ url: '/system/user/changeStatus', data }, { successMessageMode: 'message' });
}

//
export function addAuthRole(userId: string | number, roleIds: (string | number)[]) {
  return defHttp.put({ url: '/system/user/authRole', params: { userId, roleIds } });
}

//
export function getImportTemplate() {
  return defHttp.post<Blob>(
    { url: '/system/user/importTemplate', responseType: 'blob' },
    { isTransformResponse: false },
  );
}

//
export function importUser(data: { updateSupport: boolean; file: File | Blob }) {
  return defHttp.post(
    {
      url: '/system/user/importData',
      data,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
    },
    { successMessageMode: 'modal', errorMessageMode: 'modal' },
  );
}

//
export function exportUser(query?: UserQuery) {
  return defHttp.post<Blob>(
    { url: '/system/user/export', params: query, responseType: 'blob' },
    { isTransformResponse: false },
  );
}

//
export function getUserListByDept(deptId: string | number) {
  return defHttp.get<UserVO>({ url: `/system/user/list/dept/${deptId}` });
}

//
export function getUserDeptTree(query?: DeptQuery) {
  return defHttp.get<DeptTree[]>({ url: '/system/user/deptTree', params: query });
}

//
export function getAuthRoleByUserId(userId: string | number) {
  return defHttp.get({ url: `/system/user/authRole/${userId}` });
}

//
export function getUserById(userId?: string | number) {
  return defHttp.get<UserInfo>({ url: userId ? `/system/user/${userId}` : '/system/user/' });
}
