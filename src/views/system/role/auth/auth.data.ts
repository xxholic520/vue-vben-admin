import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { useDict } from '@/utils/helper/dictHelper';

const dictState = useDict('sys_normal_disable');

export const columns: BasicColumn[] = [
  { title: '用户名称', dataIndex: 'userName' },
  { title: '用户昵称', dataIndex: 'nickName' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '手机', dataIndex: 'phonenumber' },
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
    width: 180,
    customRender: ({ value }) => {
      return useRender().renderDateTime(value);
    },
  },
];

export const searchFormSchemas: FormSchema[] = [
  {
    label: '用户名称',
    field: 'userName',
    component: 'Input',
    componentProps: { placeholder: '请输入用户名称' },
  },
  {
    label: '手机号码',
    field: 'phonenumber',
    component: 'Input',
    componentProps: { placeholder: '请输入手机号码' },
  },
];

export const formSchemas: FormSchema[] = [];
