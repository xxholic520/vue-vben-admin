import { BasicEnity, BasicFetchResult } from '@/api/model/baseModel';
import { DeptVO } from '../dept/types';
import { RoleVO } from '../role/types';

/**
 * 用户信息
 */
export interface UserInfo {
  user?: UserVO;
  roleIds?: string[];
  roles: RoleVO[];
  postIds?: number[];
  posts: PostVO[];
}

/**
 * 用户信息返回实体
 */
export interface UserVO extends BasicEnity {
  userId: string | number;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  dept: DeptVO;
  roles: RoleVO[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
}

/**
 * 用户请求参数
 */
export interface UserQuery {
  /**
   * 创建者
   */
  createBy?: number;
  /**
   * 创建部门
   */
  createDept?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 排序列
   */
  orderByColumn?: string;
  /**
   * 当前页数
   */
  pageNum?: number;
  /**
   * 分页大小
   */
  pageSize?: number;
  /**
   * 请求参数
   */
  params?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 岗位组
   */
  postIds?: string[];
  /**
   * 备注
   */
  remark?: string;
  /**
   * 数据权限 当前角色ID
   */
  roleId?: number;
  /**
   * 角色组
   */
  roleIds?: string[];
  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;
  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string;
  superAdmin?: string;
  /**
   * 更新者
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户账号
   */
  userName: string;
  /**
   * 用户类型（sys_user系统用户）
   */
  userType?: string;
  [property: string]: any;
}

export interface UserForm {
  /**
   * 创建者
   */
  createBy?: number;
  /**
   * 创建部门
   */
  createDept?: number;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } };
  /**
   * 密码
   */
  password?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 岗位组
   */
  postIds?: number[];
  /**
   * 备注
   */
  remark?: string;
  /**
   * 数据权限 当前角色ID
   */
  roleId?: number;
  /**
   * 角色组
   */
  roleIds?: number[];
  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;
  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string;
  superAdmin?: boolean;
  /**
   * 更新者
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 用户ID
   */
  userId?: string | number;
  /**
   * 用户账号
   */
  userName?: string;
  /**
   * 用户类型（sys_user系统用户）
   */
  userType?: string;
  [property: string]: any;
}

export interface PostVO {
  postId: number;
  postCode: string;
  postName: string;
  postSort: number;
  status: string;
  remark: string;
  createTime: string;
}

export interface ResetPwdParam {
  userId: string;
  password: string;
}

export type UserListGetResultModel = BasicFetchResult<UserVO>;
