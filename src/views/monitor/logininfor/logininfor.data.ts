import { BasicColumn, FormSchema } from '@/components/Table';
import { DictTag } from '@/components/Tag';
import { useDict } from '@/utils/helper/dictHelper';
import { h, unref } from 'vue';
import dayjs from 'dayjs';

const dictState = useDict('sys_device_type', 'sys_common_status');

export const columns: BasicColumn[] = [
  { title: '访问编号', dataIndex: 'infoId' },
  { title: '用户名称', dataIndex: 'userName', sorter: true, width: 100 },
  { title: '客户端', dataIndex: 'clientKey', width: 80 },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    customRender: ({ record }) => {
      return h(DictTag, { options: unref(dictState).sys_device_type, value: record.deviceType });
    },
    width: 80,
  },
  { title: '地址', dataIndex: 'ipaddr' },
  { title: '登录地点', dataIndex: 'loginLocation' },
  { title: '操作系统', dataIndex: 'os' },
  { title: '浏览器', dataIndex: 'browser' },
  {
    title: '登录状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return h(DictTag, { options: unref(dictState).sys_common_status, value: record.status });
    },
  },
  { title: '描述', dataIndex: 'msg' },
  { title: '访问时间', dataIndex: 'loginTime', sorter: true },
];

export const searchSchma: FormSchema[] = [
  { label: '登录地址', field: 'ipaddr', component: 'Input', colProps: { span: 6 } },
  { label: '用户名称', field: 'userName', component: 'Input', colProps: { span: 6 } },
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
    label: '登录时间',
    field: 'fieldTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultPickerValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
    },
    colProps: { span: 6 },
  },
];
