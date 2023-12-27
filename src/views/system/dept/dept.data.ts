import { getDeptList } from '@/api/system/dept';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { useDict } from '@/utils/helper/dictHelper';
import { listToTree } from '@/utils/helper/treeHelper';

const dictState = useDict('sys_normal_disable');

// 列表
export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value }) => {
      return useRender().renderDictTag(value, dictState.value.sys_normal_disable);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ value }) => {
      return useRender().renderDateTime(value);
    },
  },
];

// 搜索
export const searchFormSchema: FormSchema[] = [
  {
    label: '部门名称',
    field: 'deptName',
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择部门状态',
      options: dictState.value.sys_normal_disable,
    }),
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: '部门id',
    field: 'deptId',
    required: true,
    component: 'Input',
    ifShow: false,
  },
  {
    label: '上级部门',
    field: 'parentId',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      placeholder: '请选择上级部门',
      api: async () => listToTree(await getDeptList(), { id: 'deptId', pid: 'parentId' }),
      labelField: 'deptName',
      valueField: 'deptId',
    },
  },
  {
    label: '部门名称',
    field: 'deptName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
    },
    colProps: { span: 12 },
  },
  {
    label: '显示排序',
    field: 'orderNum',
    required: true,
    defaultValue: 0,
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入显示顺序',
    },
    colProps: { span: 12 },
  },
  {
    label: '负责人',
    field: 'leader',
    component: 'Select',
    componentProps: {
      placeholder: '请选择负责人',
    },
    colProps: { span: 12 },
  },
  {
    label: '联系电话',
    field: 'phone',
    component: 'Input',
    componentProps: {
      placeholder: '请输入联系电话',
    },
    colProps: { span: 12 },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
    },
    colProps: { span: 12 },
  },
  {
    label: '部门状态',
    field: 'status',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: () => ({
      options: dictState.value.sys_normal_disable,
    }),
    colProps: { span: 12 },
  },
];
