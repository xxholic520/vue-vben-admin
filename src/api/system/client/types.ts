import { BasicFetchResult } from '@/api/model/baseModel';

export interface ClientQuery {
  /**
   * token活跃超时时间
   */
  activeTimeout?: number;
  /**
   * 客户端id
   */
  clientId?: string;
  /**
   * 客户端key
   */
  clientKey: string;
  /**
   * 客户端秘钥
   */
  clientSecret: string;
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
   * 设备类型
   */
  deviceType?: string;
  /**
   * 授权类型
   */
  grantType?: string;
  /**
   * 授权类型
   */
  grantTypeList: string[];
  /**
   * id
   */
  id: number;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
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
   * 状态（0正常 1停用）
   */
  status?: string;
  /**
   * token固定超时时间
   */
  timeout?: number;
  /**
   * 更新者
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
}

/**
 * SysClientVo，授权管理视图对象 sys_client
 */
export interface SysClientVo {
  /**
   * token活跃超时时间
   */
  activeTimeout?: number;
  /**
   * 客户端id
   */
  clientId?: string;
  /**
   * 客户端key
   */
  clientKey?: string;
  /**
   * 客户端秘钥
   */
  clientSecret?: string;
  /**
   * 设备类型
   */
  deviceType?: string;
  /**
   * 授权类型
   */
  grantType?: string;
  /**
   * 授权类型
   */
  grantTypeList?: string[];
  /**
   * id
   */
  id?: number;
  /**
   * 状态（0正常 1停用）
   */
  status?: string;
  /**
   * token固定超时时间
   */
  timeout?: number;
}

export type ClientListResultModel = BasicFetchResult<SysClientVo>;
