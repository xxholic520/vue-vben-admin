import { BasicEnity, BasicFetchResult, PageQuery } from '@/api/model/baseModel';

export interface RoleVO {
  /**
   * 角色ID
   */
  roleId: string | number;

  /**
   * 角色名称
   */
  roleName: string;

  /**
   * 角色权限字符串
   */
  roleKey: string;

  /**
   * 显示顺序
   */
  roleSort: number;

  /**
   * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
   */
  dataScope: string;

  /**
   * 菜单树选择项是否关联显示
   */
  menuCheckStrictly: number;

  /**
   * 部门树选择项是否关联显示
   */
  deptCheckStrictly: number;

  /**
   * 角色状态（0正常 1停用）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;
}

export interface RoleForm extends BasicEnity {
  /**
   * 角色ID
   */
  roleId?: string | number;

  /**
   * 角色名称
   */
  roleName?: string;

  /**
   * 角色权限字符串
   */
  roleKey?: string;

  /**
   * 显示顺序
   */
  roleSort?: number;

  /**
   * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
   */
  dataScope?: string;

  /**
   * 菜单树选择项是否关联显示
   */
  menuCheckStrictly?: number;

  /**
   * 部门树选择项是否关联显示
   */
  deptCheckStrictly?: number;

  /**
   * 角色状态（0正常 1停用）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface RoleQuery extends PageQuery {
  /**
   * 角色名称
   */
  roleName?: string;

  /**
   * 角色权限字符串
   */
  roleKey?: string;

  /**
   * 显示顺序
   */
  roleSort?: number;

  /**
   * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
   */
  dataScope?: string;

  /**
   * 菜单树选择项是否关联显示
   */
  menuCheckStrictly?: number;

  /**
   * 部门树选择项是否关联显示
   */
  deptCheckStrictly?: number;

  /**
   * 角色状态（0正常 1停用）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export interface DeptOption {
  id: number;
  parentId: number;
  label: string;
  weight: number;
  children: DeptOption[];
}

export type RoleListGetResultModel = BasicFetchResult<RoleVO>;
