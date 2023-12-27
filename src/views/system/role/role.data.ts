import { changeRoleStatus } from '@/api/system/role';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { useDict } from '@/utils/helper/dictHelper';

const dictState = useDict('sys_normal_disable');

// 列表
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '权限字符',
    dataIndex: 'roleKey',
  },
  {
    title: '显示顺序',
    dataIndex: 'roleSort',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return useRender().renderSwitch(record, changeRoleStatus);
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
    label: '角色名称',
    field: 'roleName',
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    label: '权限字符',
    field: 'roleKey',
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色权限字符串',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择角色状态',
      options: dictState.value.sys_normal_disable,
    }),
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: '角色ID',
    field: 'roleId',
    required: true,
    component: 'Input',
    ifShow: false,
  },
  {
    label: '角色名称',
    field: 'roleName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    label: '权限字符',
    helpMessage: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)",
    field: 'roleKey',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色权限字符串',
    },
  },
  {
    label: '角色顺序',
    field: 'roleSort',
    required: true,
    defaultValue: 1,
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入角色顺序',
    },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: '0',
    component: 'RadioGroup',
    componentProps: () => ({
      options: dictState.value.sys_normal_disable,
    }),
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
  {
    label: '',
    field: 'menuIds',
    slot: 'menu',
    defaultValue: [],
    component: 'ApiTree',
  },
];

const authScopeOptions = [
  { label: '全部数据权限', value: '1' },
  { label: '自定数据权限', value: '2' },
  { label: '本部门数据权限', value: '3' },
  { label: '本部门及以下数据权限', value: '4' },
  { label: '仅本人数据权限', value: '5' },
];

export const authSchemas: FormSchema[] = [
  {
    field: 'roleId',
    label: '角色ID',
    component: 'Input',
    show: false,
  },
  {
    label: '角色名称',
    field: 'roleName',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '权限标识',
    field: 'roleKey',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '权限范围',
    field: 'dataScope',
    helpMessage: '更改后需要用户重新登录才能生效',
    component: 'Select',
    componentProps: {
      options: authScopeOptions,
    },
  },
  {
    label: '部门权限',
    field: 'deptIds',
    slot: 'deptTree',
    helpMessage: '更改后立即生效',
    defaultValue: [],
    component: 'Input',
    show({ values }) {
      // 为自定义的时候才显示
      return values.dataScope === '2';
    },
  },
];
