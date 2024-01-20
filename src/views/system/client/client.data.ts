import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { useRender } from '@/hooks/component/useRender';
import { changeStatus } from '@/api/system/client';
import { useDict } from '@/utils/helper/dictHelper';
import { unref } from 'vue';

const dictState = useDict('sys_grant_type', 'sys_device_type', 'sys_normal_disable');

const { renderSwitch, renderDictTag } = useRender();

export const searchFormSchemas: FormSchema[] = [
  {
    label: '客户端key',
    field: 'clientKey',
    component: 'Input',
  },
  {
    label: '客户端秘钥',
    field: 'clientSecret',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: () => ({
      options: unref(dictState).sys_normal_disable,
    }),
  },
];

export const columns: BasicColumn[] = [
  {
    title: '客户端ID',
    dataIndex: 'clientId',
  },
  {
    title: '客户端key',
    dataIndex: 'clientKey',
  },
  {
    title: '客户端秘钥',
    dataIndex: 'clientSecret',
  },
  {
    title: '授权类型',
    dataIndex: 'grantTypeList',
    customRender({ value }) {
      if (!value) {
        return '无';
      }
      return renderDictTag(value, unref(dictState).sys_grant_type);
    },
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
  },
  {
    title: 'token活跃时间',
    dataIndex: 'activeTimeout',
    customRender({ value }) {
      return value + '秒';
    },
  },
  {
    title: 'token超时时间',
    dataIndex: 'timeout',
    customRender({ value }) {
      return value + '秒';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender({ record }) {
      return renderSwitch(record, changeStatus);
    },
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '客户端ID',
    field: 'clientId',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    show: false,
  },
  {
    label: '客户端key',
    field: 'clientKey',
    component: 'Input',
    required: true,
  },
  {
    label: '客户端秘钥',
    field: 'clientSecret',
    component: 'Input',
    required: true,
  },
  {
    label: '授权类型',
    field: 'grantTypeList',
    component: 'Select',
    componentProps: () => ({
      options: unref(dictState).sys_grant_type,
      mode: 'multiple',
      optionFilterProp: 'label',
    }),
    required: true,
  },
  {
    label: '设备类型',
    field: 'deviceType',
    component: 'Select',
    componentProps: () => ({
      options: unref(dictState).sys_device_type,
    }),
    required: true,
  },
  {
    label: 'Token活跃超时时间',
    field: 'activeTimeout',
    defaultValue: 1800,
    component: 'InputNumber',
    helpMessage: '指定时间无操作则过期(单位：秒), 默认30分钟(1800秒)',
    colProps: { span: 12 },
  },
  {
    label: 'Token固定超时时间',
    field: 'timeout',
    defaultValue: 604800,
    component: 'InputNumber',
    helpMessage: '指定时间必定过期(单位：秒)，默认七天(604800秒)',
    colProps: { span: 12 },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: '0',
    component: 'RadioButtonGroup',
    componentProps: () => ({
      options: unref(dictState).sys_normal_disable,
    }),
  },
];
