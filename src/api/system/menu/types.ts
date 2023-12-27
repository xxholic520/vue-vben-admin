import { BasicEnity } from '@/api/model/baseModel';
import { AppRouteModule } from '@/router/types';
import { RouteMeta } from 'vue-router';

export interface RouterVO extends Omit<AppRouteModule, 'meta'> {
  hidden?: boolean;
  query?: string;
  alwaysShow?: boolean;
  meta: RouteMeta & { noCache?: boolean; link?: string };
}

/**
 * @description 菜单查询参数类型
 */
export interface MenuQuery {
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 菜单类型（M目录 C菜单 F按钮）
   */
  menuType: string;
  /**
   * 显示顺序
   */
  orderNum: number;
}

/**
 * SysMenuVo，菜单权限视图对象 sys_menu
 */
export interface SysMenuVo extends BasicEnity {
  /**
   * 子菜单
   */
  children?: SysMenuVo[];
  /**
   * 组件路径
   */
  component?: string;
  /**
   * 菜单图标
   */
  icon?: string;
  /**
   * 是否缓存（0缓存 1不缓存）
   */
  isCache?: string;
  /**
   * 是否为外链（0是 1否）
   */
  isFrame?: string;
  /**
   * 菜单ID
   */
  menuId?: number;
  /**
   * 菜单名称
   */
  menuName?: string;
  /**
   * 菜单类型（M目录 C菜单 F按钮）
   */
  menuType?: string;
  /**
   * 显示顺序
   */
  orderNum?: number;
  /**
   * 父菜单ID
   */
  parentId?: number;
  /**
   * 路由地址
   */
  path?: string;
  /**
   * 权限标识
   */
  perms?: string;
  /**
   * 路由参数
   */
  queryParam?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 菜单状态（0正常 1停用）
   */
  status?: string;
  /**
   * 显示状态（0显示 1隐藏）
   */
  visible?: string;
  [property: string]: any;
}
