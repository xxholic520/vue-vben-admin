import { BasicFetchResult } from '@/api/model/baseModel';

export interface OperLogQuery {
  /**
   * 业务类型（0其它 1新增 2修改 3删除）
   */
  businessType?: number;
  /**
   * 业务类型数组
   */
  businessTypes?: string[];
  /**
   * 消耗时间
   */
  costTime?: number;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 错误消息
   */
  errorMsg?: string;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
  /**
   * 返回参数
   */
  jsonResult?: string;
  /**
   * 方法名称
   */
  method?: string;
  /**
   * 操作类别（0其它 1后台用户 2手机端用户）
   */
  operatorType?: number;
  /**
   * 日志主键
   */
  operId?: number;
  /**
   * 主机地址
   */
  operIp?: string;
  /**
   * 操作地点
   */
  operLocation?: string;
  /**
   * 操作人员
   */
  operName?: string;
  /**
   * 请求参数
   */
  operParam?: string;
  /**
   * 操作时间
   */
  operTime?: string;
  /**
   * 请求URL
   */
  operUrl?: string;
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
   * 请求方式
   */
  requestMethod?: string;
  /**
   * 操作状态（0正常 1异常）
   */
  status?: number;
  /**
   * 租户编号
   */
  tenantId?: string;
  /**
   * 模块标题
   */
  title?: string;
}

/**
 * SysOperLogVo，操作日志记录视图对象 sys_oper_log
 */
export interface SysOperLogVo {
  /**
   * 业务类型（0其它 1新增 2修改 3删除）
   */
  businessType?: number;
  /**
   * 业务类型数组
   */
  businessTypes?: number[];
  /**
   * 消耗时间
   */
  costTime?: number;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 错误消息
   */
  errorMsg?: string;
  /**
   * 返回参数
   */
  jsonResult?: string;
  /**
   * 方法名称
   */
  method?: string;
  /**
   * 操作类别（0其它 1后台用户 2手机端用户）
   */
  operatorType?: number;
  /**
   * 日志主键
   */
  operId?: number;
  /**
   * 主机地址
   */
  operIp?: string;
  /**
   * 操作地点
   */
  operLocation?: string;
  /**
   * 操作人员
   */
  operName?: string;
  /**
   * 请求参数
   */
  operParam?: string;
  /**
   * 操作时间
   */
  operTime?: Date;
  /**
   * 请求URL
   */
  operUrl?: string;
  /**
   * 请求方式
   */
  requestMethod?: string;
  /**
   * 操作状态（0正常 1异常）
   */
  status?: number;
  /**
   * 租户编号
   */
  tenantId?: string;
  /**
   * 模块标题
   */
  title?: string;
}

export type OperLogListGetResultModel = BasicFetchResult<SysOperLogVo>;
