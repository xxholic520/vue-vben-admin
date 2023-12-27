import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import dayjs from 'dayjs';
import { RouterLink } from 'vue-router';

export const columns: BasicColumn[] = [
  // { title: '字典编号', dataIndex: 'dictId' },
  { title: '字典名称', dataIndex: 'dictName' },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    customRender: ({ record }) => {
      return h(
        RouterLink,
        { to: `/system/dict-data/${record.dictId}/index` },
        { default: () => record.dictType },
      );
    },
  },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
];

export const searchSchma: FormSchema[] = [
  { label: '字典名称', field: 'dictName', component: 'Input' },
  { label: '字典类型', field: 'dictType', component: 'Input' },
  {
    label: '创建时间',
    field: 'fieldTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultPickerValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
    },
  },
];

export const typeFormSchema: FormSchema[] = [
  { field: 'dictId', component: 'Input', show: false },
  {
    label: '字典名称',
    field: 'dictName',
    component: 'Input',
    componentProps: {},
    required: true,
  },
  {
    label: '字典类型',
    field: 'dictType',
    component: 'Input',
    required: true,
  },
  { label: '备注', field: 'remark', component: 'InputTextArea' },
];
