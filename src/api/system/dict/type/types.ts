import { BasicFetchResult } from '@/api/model/baseModel';

export interface DictTypeQuery {
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
   * 字典主键
   */
  dictId?: number;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典类型
   */
  dictType: string;
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
 * SysDictTypeVo，字典类型视图对象 sys_dict_type
 */
export interface SysDictTypeVo {
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 字典主键
   */
  dictId?: number;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典类型
   */
  dictType?: string;
  /**
   * 备注
   */
  remark?: string;
}

export type DictTypeListGetResultModel = BasicFetchResult<SysDictTypeVo>;
