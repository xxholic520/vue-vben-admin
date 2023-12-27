import { BasicEnity, BasicFetchResult, PageQuery } from '@/api/model/baseModel';

export interface DeviceVO {
  /**
   * 设备ID
   */
  id: string | number;

  /**
   * 所属设备服务器
   */
  withServer: number;

  /**
   * 设备名称
   */
  devName: string;

  /**
   * 设备类型
   */
  devType: string;

  /**
   * 设备端口类型
   */
  devPortType: string;

  /**
   * 设备地址
   */
  devPortAddr: string;

  /**
   * 设备端口号
   */
  devPortNo: number;

  /**
   * 设备状态
   */
  devState: string;

  /**
   * 备注
   */
  memo: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface DeviceForm extends BasicEnity {
  /**
   * 设备ID
   */
  id?: string | number;

  /**
   * 所属设备服务器
   */
  withServer?: number;

  /**
   * 设备名称
   */
  devName?: string;

  /**
   * 设备类型
   */
  devType?: string;

  /**
   * 设备端口类型
   */
  devPortType?: string;

  /**
   * 设备地址
   */
  devPortAddr?: string;

  /**
   * 设备端口号
   */
  devPortNo?: number;

  /**
   * 设备状态
   */
  devState?: string;

  /**
   * 备注
   */
  memo?: string;
}

export interface DeviceQuery extends PageQuery {
  /**
   * 所属设备服务器
   */
  withServer?: number;

  /**
   * 设备名称
   */
  devName?: string;

  /**
   * 设备类型
   */
  devType?: string;

  /**
   * 设备端口类型
   */
  devPortType?: string;

  /**
   * 设备地址
   */
  devPortAddr?: string;

  /**
   * 设备端口号
   */
  devPortNo?: number;

  /**
   * 设备状态
   */
  devState?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export type DeviceListGetResultModel = BasicFetchResult<DeviceVO>;
