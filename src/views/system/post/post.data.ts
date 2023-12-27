import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { useDict } from '@/utils/helper/dictHelper';

const dictState = useDict('sys_normal_disable');

// 列表
export const columns: BasicColumn[] = [
  {
    title: '岗位ID',
    dataIndex: 'postId',
    ifShow: false,
  },
  {
    title: '岗位编码',
    dataIndex: 'postCode',
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
  },
  {
    title: '岗位排序',
    dataIndex: 'postSort',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return useRender().renderDictTag(record.status, dictState.value.sys_normal_disable);
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
    label: '岗位编码',
    field: 'postCode',
    component: 'Input',
    componentProps: {
      placeholder: '请输入岗位编码',
    },
  },
  {
    label: '岗位名称',
    field: 'postName',
    component: 'Input',
    componentProps: {
      placeholder: '请输入岗位名称',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择状态',
      options: dictState.value.sys_normal_disable,
    }),
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: '岗位ID',
    field: 'postId',
    required: true,
    component: 'Input',
    ifShow: false,
  },
  {
    label: '岗位编码',
    field: 'postCode',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入岗位编码',
    },
  },
  {
    label: '岗位名称',
    field: 'postName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入岗位名称',
    },
  },
  {
    label: '岗位顺序',
    field: 'postSort',
    required: true,
    defaultValue: 0,
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入显示顺序',
    },
  },
  {
    label: '状态',
    field: 'status',
    required: false,
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: () => ({
      options: dictState.value.sys_normal_disable,
    }),
  },
  {
    label: '备注',
    field: 'remark',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
];
