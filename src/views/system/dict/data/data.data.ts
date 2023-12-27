import { getDictTypeOptions } from '@/api/system/dict/type';
import { BasicColumn, FormSchema } from '@/components/Table';
import { DictTag } from '@/components/Tag';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    customRender: ({ record }) => {
      return h(DictTag, {
        options: [{ label: record.dictLabel, value: record.dictValue, tagClass: record.listClass }],
        value: record.dictValue,
      });
    },
  },
  { title: '字典键值', dataIndex: 'dictValue' },
  { title: '字典排序', dataIndex: 'dictSort' },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
];

export const searchSchema: FormSchema[] = [
  {
    label: '字典名称',
    field: 'dictType',
    component: 'ApiSelect',
    componentProps: {
      value: undefined,
      api: getDictTypeOptions,
      labelField: 'dictName',
      valueField: 'dictType',
    },
  },
  { label: '字典标签', field: 'dictLabel', component: 'Input' },
];

const listClassOptions: Recordable[] = [
  { value: 'default', label: '默认' },
  { value: 'primary', label: '主要' },
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' },
];

export const formSchema: FormSchema[] = [
  { field: 'dictCode', label: '', component: 'Input', ifShow: false },
  {
    field: 'dictType',
    label: '字典类型',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'dictLabel',
    label: '数据标签',
    component: 'Input',
    required: true,
  },
  { field: 'dictValue', label: '数据键值', component: 'Input', required: true },
  { field: 'cssClass', label: '样式属性', component: 'Input' },
  {
    field: 'dictSort',
    label: '显示排序',
    component: 'InputNumber',
    componentProps: { min: 0 },
    required: true,
  },
  {
    field: 'listClass',
    label: '回显样式',
    component: 'Select',
    componentProps: {
      options: listClassOptions,
    },
  },
  { field: 'remark', label: '备注', component: 'InputTextArea' },
];
