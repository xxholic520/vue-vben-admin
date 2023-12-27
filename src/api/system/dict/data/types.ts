import { BasicEnity, BasicFetchResult } from '@/api/model/baseModel';

export interface DictDataQuery {
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
   * 样式属性（其他样式扩展）
   */
  cssClass?: string;
  /**
   * 字典编码
   */
  dictCode?: number;
  /**
   * 字典标签
   */
  dictLabel: string;
  /**
   * 字典排序
   */
  dictSort?: number;
  /**
   * 字典类型
   */
  dictType: string;
  /**
   * 字典键值
   */
  dictValue: string;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
  /**
   * 是否默认（Y是 N否）
   */
  isDefault?: string;
  /**
   * 表格回显样式
   */
  listClass?: string;
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
 * SysDictDataVo，字典数据视图对象 sys_dict_data
 */
export interface SysDictDataVo extends BasicEnity {
  /**
   * 样式属性（其他样式扩展）
   */
  cssClass?: string;
  /**
   * 字典编码
   */
  dictCode?: number;
  /**
   * 字典标签
   */
  dictLabel: string;
  /**
   * 字典排序
   */
  dictSort?: number;
  /**
   * 字典类型
   */
  dictType?: string;
  /**
   * 字典键值
   */
  dictValue: string;
  /**
   * 是否默认（Y是 N否）
   */
  isDefault?: string;
  /**
   * 表格回显样式
   */
  listClass?: string;
  /**
   * 备注
   */
  remark?: string;
}

export type DictDataListGetResultModel = BasicFetchResult<SysDictDataVo>;
