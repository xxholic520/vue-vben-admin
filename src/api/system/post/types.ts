import { BasicEnity, BasicFetchResult, PageQuery } from '@/api/model/baseModel';

export interface PostVO {
  /**
   * 岗位ID
   */
  postId: string | number;

  /**
   * 岗位编码
   */
  postCode: string;

  /**
   * 岗位名称
   */
  postName: string;

  /**
   * 显示顺序
   */
  postSort: number;

  /**
   * 状态（0正常 1停用）
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

  createTime: string;
}

export interface PostForm extends BasicEnity {
  /**
   * 岗位ID
   */
  postId?: string | number;

  /**
   * 岗位编码
   */
  postCode?: string;

  /**
   * 岗位名称
   */
  postName?: string;

  /**
   * 显示顺序
   */
  postSort?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface PostQuery extends PageQuery {
  /**
   * 岗位编码
   */
  postCode?: string;

  /**
   * 岗位名称
   */
  postName?: string;

  /**
   * 显示顺序
   */
  postSort?: number;

  /**
   * 状态（0正常 1停用）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export type PostListGetResultModel = BasicFetchResult<PostVO>;
