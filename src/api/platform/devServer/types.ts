import { BasicEnity, BasicFetchResult, PageQuery } from '@/api/model/baseModel';

export interface DevServerVO {
  /**
   * 服务器ID
   */
  id: string | number;

  /**
   * 服务器名称
   */
  serverName: string;

  /**
   * 服务器地址
   */
  serverAddr: string;

  /**
   * 服务器地址端口
   */
  serverPort: number;

  /**
   * 备注
   */
  memo: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface DevServerForm extends BasicEnity {
  /**
   * 服务器ID
   */
  id?: string | number;

  /**
   * 服务器名称
   */
  serverName?: string;

  /**
   * 服务器地址
   */
  serverAddr?: string;

  /**
   * 服务器地址端口
   */
  serverPort?: number;

  /**
   * 备注
   */
  memo?: string;
}

export interface DevServerQuery extends PageQuery {
  /**
   * 服务器名称
   */
  serverName?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export type DevServerListGetResultModel = BasicFetchResult<DevServerVO>;
