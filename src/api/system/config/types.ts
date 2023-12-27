import { BasicFetchResult } from '@/api/model/baseModel';

export interface ConfigQuery {
  /**
   * 参数主键
   */
  configId?: number;
  /**
   * 参数键名
   */
  configKey: string;
  /**
   * 参数名称
   */
  configName: string;
  /**
   * 系统内置（Y是 N否）
   */
  configType?: string;
  /**
   * 参数键值
   */
  configValue: string;
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
   * 备注
   */
  remark?: string;
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
 * SysConfigVo，参数配置视图对象 sys_config
 */
export interface SysConfigVo {
  /**
   * 参数主键
   */
  configId?: number;
  /**
   * 参数键名
   */
  configKey?: string;
  /**
   * 参数名称
   */
  configName?: string;
  /**
   * 系统内置（Y是 N否）
   */
  configType?: string;
  /**
   * 参数键值
   */
  configValue?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 备注
   */
  remark?: string;
}

export type ConfigListGetResultModel = BasicFetchResult<SysConfigVo>;
