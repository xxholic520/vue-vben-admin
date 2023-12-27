import { BasicColumn, FormSchema } from '@/components/Table';
import { h, unref } from 'vue';
import { selectDictLabel, useDict } from '@/utils/helper/dictHelper';
import { DictTag } from '@/components/Tag';
import { DescItem } from '@/components/Description';
import dayjs from 'dayjs';

const dictState = useDict('sys_oper_type', 'sys_common_status');

export const columns: BasicColumn[] = [
  { title: '日志编号', dataIndex: 'operId' },
  { title: '系统模块', dataIndex: 'title' },
  {
    title: '操作类型',
    dataIndex: 'businessType',
    customRender: ({ record }) => {
      return h(DictTag, { options: unref(dictState).sys_oper_type, value: record.businessType });
    },
  },
  { title: '操作人员', dataIndex: 'operName', sorter: true, sortDirections: ['ascend', 'descend'] },
  { title: '部门', dataIndex: 'deptName' },
  { title: '操作地址', dataIndex: 'operIp' },
  {
    title: '操作状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return h(DictTag, { options: unref(dictState).sys_common_status, value: record.status });
    },
  },
  { title: '操作日期', dataIndex: 'operTime' },
  { title: '消耗时间', dataIndex: 'costTime', sorter: true },
];

export const searchFormSchema: FormSchema[] = [
  { label: '操作地址', field: 'operIp', component: 'Input', colProps: { span: 6 } },
  { label: '系统模块', field: 'title', component: 'Input', colProps: { span: 6 } },
  { label: '操作人员', field: 'operName', component: 'Input', colProps: { span: 6 } },
  {
    label: '类型',
    field: 'businessType',
    component: 'Select',
    componentProps: () => {
      return {
        options: unref(dictState).sys_oper_type,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: () => {
      return {
        options: unref(dictState).sys_common_status,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '操作时间',
    field: 'fieldTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultPickerValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
    },
    colProps: { span: 6 },
  },
];

export const descriptionSchma: DescItem[] = [
  {
    label: '登录信息',
    labelMinWidth: 100,
    field: 'operName',
    render: (val, data) => {
      return `${val} / ${data.deptName} / ${data.operIp} / ${data.operLocation}`;
    },
  },
  {
    label: '请求信息',
    labelMinWidth: 100,
    field: 'requestMethod',
    render: (val, data) => {
      return `${val} ${data.operUrl}`;
    },
  },
  {
    label: '操作模块',
    labelMinWidth: 100,
    field: 'title',
    render: (val, data) => {
      return `${val} ${selectDictLabel(unref(dictState).sys_oper_type, data.businessType)}`;
    },
  },
  { label: '操作方法', labelMinWidth: 100, span: 2, field: 'method' },
  { label: '请求参数', labelMinWidth: 100, span: 2, field: 'operParam' },
  { label: '返回参数', labelMinWidth: 100, span: 2, field: 'jsonResult' },
  {
    label: '操作状态',
    labelMinWidth: 100,
    field: 'status',
    render: (val) => (val === 0 ? '正常' : '失败'),
  },
  { label: '消耗时间', labelMinWidth: 100, field: 'costTime', render: (val) => `${val}毫秒` },
  { label: '操作时间', labelMinWidth: 100, field: 'operTime' },
  {
    label: '异常信息',
    labelMinWidth: 100,
    field: 'errorMsg',
    show: (args) => {
      if (args) {
        const { status } = args;
        return status === 1;
      }
      return false;
    },
  },
];
