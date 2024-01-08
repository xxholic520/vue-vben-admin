import { getParaGroupOptions } from '@/api/platform/para';
import { BasicColumn, FormSchema } from '@/components/Table';

// 列表
export const columns: BasicColumn[] = [
  {
    title: '参数代码',
    dataIndex: 'paraCode',
  },
  {
    title: '参数名称',
    dataIndex: 'paraName',
  },
  {
    title: '参数值',
    dataIndex: 'paraValue',
  },
  {
    title: '排列序号',
    dataIndex: 'paraOrder',
  },
  {
    title: '备注',
    dataIndex: 'memo',
  },
];

// 搜索
export const searchFormSchema: FormSchema[] = [
  {
    field: 'paraGroup',
    component: 'ApiSelect',
    componentProps: {
      placeholder: '请选择参数组名',
      api: getParaGroupOptions,
      labelField: 'paraGroup',
      valueField: 'paraGroup',
      allowClear: false,
    },
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    required: true,
    component: 'Input',
    ifShow: false,
  },
  {
    label: '参数代码',
    field: 'paraCode',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入参数代码',
    },
  },
  {
    label: '参数组名',
    field: 'paraGroup',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入参数组名',
    },
  },
  {
    label: '参数名称',
    field: 'paraName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入参数名称',
    },
  },
  {
    label: '参数级别',
    field: 'paraLevel',
    required: true,
    component: 'Select',
    componentProps: {
      placeholder: '请选择参数级别',
      options: [
        { value: 0, label: '关键参数' },
        { value: 9, label: '普通参数' },
      ],
    },
  },
  {
    label: '参数类型',
    field: 'paraType',
    required: true,
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择参数类型',
      options: [
        { value: 1, label: '整数' },
        { value: 5, label: '逻辑' },
        { value: 6, label: '选择' },
        { value: 10, label: '浮点' },
        { value: 100, label: '字符' },
      ],
    }),
  },
  {
    label: '最小值',
    field: 'minValue',
    component: 'Input',
    componentProps: {
      placeholder: '请输入最小值',
    },
  },
  {
    label: '最大值',
    field: 'maxValue',
    component: 'Input',
    componentProps: {
      placeholder: '请输入最大值',
    },
  },
  {
    label: '默认值',
    field: 'defValue',
    component: 'Input',
    componentProps: {
      placeholder: '请输入默认值',
    },
  },
  {
    label: '参数值',
    field: 'paraValue',
    component: 'Input',
    componentProps: {
      placeholder: '请输入参数值',
    },
  },
  {
    label: '排列序号',
    field: 'paraOrder',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入排列序号',
    },
  },
  {
    label: '备注',
    field: 'memo',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
];
