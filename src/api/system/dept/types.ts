import { BasicEnity } from '@/api/model/baseModel';
import { TreeItem } from '@/components/Tree';

export interface DeptVO {
  /**
   * 部门id
   */
  deptId: string | number;

  /**
   * 父部门id
   */
  parentId: string | number;

  /**
   * 祖级列表
   */
  ancestors: string;

  /**
   * 部门名称
   */
  deptName: string;

  /**
   * 显示顺序
   */
  orderNum: number;

  /**
   * 负责人
   */
  leader: number;

  /**
   * 联系电话
   */
  phone: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 部门状态（0正常 1停用）
   */
  status: string;

  /**
   * 子对象
   */
  children: DeptVO[];
}

export interface DeptForm extends BasicEnity {
  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 父部门id
   */
  parentId?: string | number;

  /**
   * 祖级列表
   */
  ancestors?: string;

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 负责人
   */
  leader?: number;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 部门状态（0正常 1停用）
   */
  status?: string;
}

export interface DeptQuery {
  /**
   * 父部门id
   */
  parentId?: string | number;

  /**
   * 祖级列表
   */
  ancestors?: string;

  /**
   * 部门名称
   */
  deptName?: string;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 负责人
   */
  leader?: number;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 部门状态（0正常 1停用）
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export interface DeptTree extends TreeItem {
  id: number;
  parentId: number;
  label: string;
  weight: number;
  children?: DeptTree[];
}

export type DeptListGetResultModel = DeptVO[];
