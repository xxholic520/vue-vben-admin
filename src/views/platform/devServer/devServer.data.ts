import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';

// 列表
export const columns: BasicColumn[] = [
  {
    title: '服务器ID',
    dataIndex: 'id',
  },
  {
    title: '服务器名称',
    dataIndex: 'serverName',
  },
  {
    title: '服务器地址',
    dataIndex: 'serverAddr',
  },
  {
    title: '服务器地址端口',
    dataIndex: 'serverPort',
  },
  {
    title: '备注',
    dataIndex: 'memo',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ record }) => {
      return useRender().renderDateTime(record.createTime);
    },
  },
];

// 搜索
export const searchFormSchema: FormSchema[] = [
  {
    label: '服务器名称',
    field: 'serverName',
    component: 'Input',
    componentProps: {
      placeholder: '请输入服务器名称',
    },
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: '服务器ID',
    field: 'id',
    required: true,
    component: 'Input',
    ifShow: false,
    componentProps: {
      placeholder: '请输入服务器ID',
    },
  },
  {
    label: '服务器名称',
    field: 'serverName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入服务器名称',
    },
  },
  {
    label: '服务器地址',
    field: 'serverAddr',
    required: false,
    component: 'Input',
    componentProps: {
      placeholder: '请输入服务器地址',
    },
  },
  {
    label: '服务器地址端口',
    field: 'serverPort',
    required: false,
    component: 'Input',
    componentProps: {
      placeholder: '请输入服务器地址端口',
    },
  },
  {
    label: '备注',
    field: 'memo',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
];
