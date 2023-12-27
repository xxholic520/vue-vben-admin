import { BasicFetchResult } from '@/api/model/baseModel';

export interface LoginInfoQuery {
  /**
   * 浏览器类型
   */
  browser?: string;
  /**
   * 客户端
   */
  clientKey?: string;
  /**
   * 设备类型
   */
  deviceType?: string;
  /**
   * 访问ID
   */
  infoId?: number;
  /**
   * 登录IP地址
   */
  ipaddr?: string;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
  /**
   * 登录地点
   */
  loginLocation?: string;
  /**
   * 访问时间
   */
  loginTime?: string;
  /**
   * 提示消息
   */
  msg?: string;
  /**
   * 排序列
   */
  orderByColumn?: string;
  /**
   * 操作系统
   */
  os?: string;
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
   * 登录状态（0成功 1失败）
   */
  status?: string;
  /**
   * 租户编号
   */
  tenantId?: string;
  /**
   * 用户账号
   */
  userName?: string;
}

/**
 * SysLogininforVo，系统访问记录视图对象 sys_logininfor
 */
export interface SysLogininforVo {
  /**
   * 浏览器类型
   */
  browser?: string;
  /**
   * 客户端
   */
  clientKey?: string;
  /**
   * 设备类型
   */
  deviceType?: string;
  /**
   * 访问ID
   */
  infoId?: number;
  /**
   * 登录IP地址
   */
  ipaddr?: string;
  /**
   * 登录地点
   */
  loginLocation?: string;
  /**
   * 访问时间
   */
  loginTime?: Date;
  /**
   * 提示消息
   */
  msg?: string;
  /**
   * 操作系统
   */
  os?: string;
  /**
   * 登录状态（0成功 1失败）
   */
  status?: string;
  /**
   * 租户编号
   */
  tenantId?: string;
  /**
   * 用户账号
   */
  userName?: string;
}

export type LoginInfoListGetResultModel = BasicFetchResult<SysLogininforVo>;
