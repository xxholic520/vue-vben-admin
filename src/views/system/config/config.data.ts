import { BasicColumn, FormSchema } from '@/components/Table';
import { DictTag } from '@/components/Tag';
import { useDict } from '@/utils/helper/dictHelper';
import { h, unref } from 'vue';
import dayjs from 'dayjs';

const dictState = useDict('sys_yes_no');

export const columns: BasicColumn[] = [
  { title: '参数主键', dataIndex: 'configId', ifShow: false },
  { title: '参数名称', dataIndex: 'configName' },
  { title: '参数键名', dataIndex: 'configKey' },
  { title: '参数键值', dataIndex: 'configValue' },
  {
    title: '系统内置',
    dataIndex: 'configType',
    customRender: ({ record }) => {
      return h(DictTag, { options: unref(dictState).sys_yes_no, value: record.configType });
    },
  },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createTime' },
];

export const formSchema: FormSchema[] = [
  { label: '参数主键', field: 'configId', component: 'Input', ifShow: false },
  { label: '参数名称', field: 'configName', required: true, component: 'Input' },
  { label: '参数键名', field: 'configKey', required: true, component: 'Input' },
  { label: '参数键值', field: 'configValue', required: true, component: 'Input' },
  {
    label: '系统内置',
    field: 'configType',
    required: true,
    component: 'RadioGroup',
    defaultValue: 'Y',
    componentProps: () => {
      return {
        options: unref(dictState).sys_yes_no,
      };
    },
  },
  { label: '备注', field: 'remark', component: 'InputTextArea' },
  {
    label: 'upload',
    field: 'data',
    component: 'DatePicker',
    componentProps: () => ({
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择xxx',
      showTime: true,
    }),
  },
];

export const searchFormSchema: FormSchema[] = [
  { label: '参数名称', field: 'configName', component: 'Input' },
  { label: '参数键名', field: 'configKey', component: 'Input' },
  {
    label: '系统内置',
    field: 'configType',
    component: 'Select',
    componentProps: () => {
      return {
        options: unref(dictState).sys_yes_no,
      };
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultPickerValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
    },
  },
];
