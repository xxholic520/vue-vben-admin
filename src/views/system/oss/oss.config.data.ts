import { BasicColumn } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { FormSchema } from '@/components/Form';
import { useDict } from '@/utils/helper/dictHelper';
import { ossConfigChangeStatus } from '@/api/system/oss/config';

const dictState = useDict('sys_yes_no');

const { renderSwitch } = useRender();

const accessPolicyOptions = [
  { label: 'private', value: '0' },
  { label: 'public', value: '1' },
  { label: 'custom', value: '2' },
];

const { renderTooltip, renderTag } = useRender();
export const columns: BasicColumn[] = [
  {
    title: '配置名称',
    dataIndex: 'configKey',
  },
  {
    title: '访问站点',
    dataIndex: 'endpoint',
    ellipsis: true,
    customRender({ value }) {
      return renderTooltip(value);
    },
  },
  // {
  //   title: '自定义域名',
  //   dataIndex: 'domain',
  // },
  {
    title: '桶名称',
    dataIndex: 'bucketName',
  },
  // {
  //   title: '前缀',
  //   dataIndex: 'prefix',
  // },
  {
    title: '域',
    dataIndex: 'region',
  },
  {
    title: '权限桶类型',
    dataIndex: 'accessPolicy',
    customRender({ value }) {
      const current = accessPolicyOptions.find((item) => item.value == value);
      return current ? renderTag(current.label) : '未知类型';
    },
  },
  {
    title: '是否默认',
    dataIndex: 'status',
    customRender({ record }) {
      return renderSwitch(record, ossConfigChangeStatus);
    },
  },
];

export const formSchems: FormSchema[] = [
  {
    label: '配置名称',
    field: 'configKey',
    component: 'Input',
  },
  {
    label: '桶名称',
    field: 'bucketName',
    component: 'Input',
  },
  {
    label: '是否默认',
    field: 'status',
    component: 'Select',
    componentProps: () => ({
      options: dictState.value.sys_yes_no,
    }),
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: 'id',
    field: 'ossConfigId',
    component: 'Input',
    show: false,
  },
  {
    label: '配置KEY',
    field: 'configKey',
    component: 'Input',
    required: true,
  },
  {
    label: '访问站点',
    field: 'endpoint',
    component: 'Input',
    required: true,
    helpMessage: '这里不需要填写http/https!!!, 加上无法预览/下载文件',
  },
  {
    label: '自定义域名',
    field: 'domain',
    component: 'Input',
  },
  {
    label: 'accessKey',
    field: 'accessKey',
    component: 'Input',
    required: true,
  },
  {
    label: 'secretKey',
    field: 'secretKey',
    component: 'Input',
    required: true,
  },
  {
    label: '桶名称',
    field: 'bucketName',
    component: 'Input',
    required: true,
  },
  {
    label: '前缀',
    field: 'prefix',
    component: 'Input',
  },
  {
    label: '是否https',
    field: 'isHttps',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 'N',
    componentProps: () => ({
      options: dictState.value.sys_yes_no,
    }),
  },
  {
    label: '权限桶类型',
    field: 'accessPolicy',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: '0',
    componentProps: { options: accessPolicyOptions },
  },
  {
    label: '域',
    field: 'region',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
