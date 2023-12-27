import { defHttp } from '@/utils/http/axios';
import { MenuQuery, RouterVO, SysMenuVo } from './types';

export function getRouters() {
  return defHttp.get<RouterVO[]>({ url: '/system/menu/getRouters' });
}

export function getMenuList(query?: MenuQuery) {
  return defHttp.get<SysMenuVo[]>({ url: '/system/menu/list', params: query });
}

export function createMenu(data: SysMenuVo) {
  return defHttp.post({ url: '/system/menu', data }, { successMessageMode: 'message' });
}

export function updateMenu(data: SysMenuVo) {
  return defHttp.put({ url: '/system/menu', data }, { successMessageMode: 'message' });
}

export function removeMenu(menuId: string | number) {
  return defHttp.delete({ url: `/system/menu/${menuId}` }, { successMessageMode: 'message' });
}

export function getMenuTreeSelect() {
  return defHttp.get<SysMenuVo[]>({ url: '/system/menu/treeselect' });
}

export function getRoleMenuTreeSelect(roleId: string | number) {
  return defHttp.get<{ checkedKeys: (string | number)[]; menus: SysMenuVo[] }>({
    url: `/system/menu/roleMenuTreeselect/${roleId}`,
  });
}
