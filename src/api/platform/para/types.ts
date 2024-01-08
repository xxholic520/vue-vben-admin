import { BasicEnity, BasicFetchResult, PageQuery } from '@/api/model/baseModel';

export interface ParaVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 参数代码
   */
  paraCode: string;

  /**
   * 参数组名
   */
  paraGroup: string;

  /**
   * 参数名称
   */
  paraName: string;

  /**
   * 参数级别
   */
  paraLevel: number;

  /**
   * 参数类型
   */
  paraType: number;

  /**
   * 最小值
   */
  minValue: number;

  /**
   * 最大值
   */
  maxValue: number;

  /**
   * 默认值
   */
  defValue: string;

  /**
   * 参数值
   */
  paraValue: string;

  /**
   * 排列序号
   */
  paraOrder: number;

  /**
   * 备注
   */
  memo: string;
}

export interface ParaForm extends BasicEnity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 参数代码
   */
  paraCode?: string;

  /**
   * 参数组名
   */
  paraGroup?: string;

  /**
   * 参数名称
   */
  paraName?: string;

  /**
   * 参数级别
   */
  paraLevel?: number;

  /**
   * 参数类型
   */
  paraType?: number;

  /**
   * 最小值
   */
  minValue?: number;

  /**
   * 最大值
   */
  maxValue?: number;

  /**
   * 默认值
   */
  defValue?: string;

  /**
   * 参数值
   */
  paraValue?: string;

  /**
   * 排列序号
   */
  paraOrder?: number;

  /**
   * 备注
   */
  memo?: string;
}

export interface ParaQuery extends PageQuery {
  /**
   * 参数代码
   */
  paraCode?: string;

  /**
   * 参数组名
   */
  paraGroup?: string;

  /**
   * 参数名称
   */
  paraName?: string;

  /**
   * 参数级别
   */
  paraLevel?: number;

  /**
   * 参数类型
   */
  paraType?: number;

  /**
   * 最小值
   */
  minValue?: number;

  /**
   * 最大值
   */
  maxValue?: number;

  /**
   * 默认值
   */
  defValue?: string;

  /**
   * 参数值
   */
  paraValue?: string;

  /**
   * 排列序号
   */
  paraOrder?: number;

  /**
   * 备注
   */
  memo?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export type ParaListGetResultModel = BasicFetchResult<ParaVO>;
