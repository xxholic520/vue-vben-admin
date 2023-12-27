import { BasicColumn } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { FormSchema } from '@/components/Form';
import { useDict } from '@/utils/helper/dictHelper';
import { h } from 'vue';
import { Tinymce } from '@/components/Tinymce';

const dictState = useDict('sys_notice_type', 'sys_notice_status');

const { renderDictTag } = useRender();

export const columns: BasicColumn[] = [
  {
    title: '公告标题',
    dataIndex: 'noticeTitle',
  },
  {
    title: '公告类型',
    dataIndex: 'noticeType',
    width: 120,
    customRender: ({ value }) => {
      return renderDictTag(value, dictState.value.sys_notice_type);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ value }) => {
      return renderDictTag(value, dictState.value.sys_notice_status);
    },
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

export const formSchems: FormSchema[] = [
  {
    field: 'noticeTitle',
    label: '公告标题',
    component: 'Input',
  },
  {
    field: 'createBy',
    label: '创建人',
    component: 'Input',
  },
  {
    field: 'noticeType',
    label: '公告类型',
    component: 'Select',
    componentProps: () => ({
      options: dictState.value.sys_notice_type,
    }),
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: '公告ID',
    field: 'noticeId',
    component: 'Input',
    show: false,
  },
  {
    label: '公告标题',
    field: 'noticeTitle',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '公告状态',
    field: 'status',
    component: 'Select',
    defaultValue: '0',
    required: true,
    componentProps: () => ({
      options: dictState.value.sys_notice_status,
    }),
    colProps: { span: 11 },
  },
  {
    label: '公告类型',
    field: 'noticeType',
    defaultValue: '1',
    component: 'Select',
    required: true,
    componentProps: () => ({
      options: dictState.value.sys_notice_type,
    }),
    colProps: { span: 11, offset: 2 },
  },
  {
    field: 'noticeContent',
    label: '公告内容',
    component: 'Input',
    required: true,
    defaultValue: '',
    colProps: { span: 24 },
    render({ model, field }) {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
