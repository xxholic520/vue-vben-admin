import { getDevServerOptions } from '@/api/platform/devServer';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useRender } from '@/hooks/component/useRender';
import { useDict } from '@/utils/helper/dictHelper';

const dictState = useDict('dsp_device_status', 'dsp_device_port_type', 'dsp_device_type');

// 列表
export const columns: BasicColumn[] = [
  {
    title: '设备ID',
    dataIndex: 'id',
  },
  {
    title: '所属设备服务器',
    dataIndex: 'withServer',
  },
  {
    title: '设备名称',
    dataIndex: 'devName',
  },
  {
    title: '设备类型',
    dataIndex: 'devType',
    customRender: ({ record }) => {
      return useRender().renderDictTag(record.devType, dictState.value.dsp_device_type);
    },
  },
  {
    title: '设备端口类型',
    dataIndex: 'devPortType',
    customRender: ({ record }) => {
      return useRender().renderDictTag(record.devPortType, dictState.value.dsp_device_port_type);
    },
  },
  {
    title: '设备地址',
    dataIndex: 'devPortAddr',
  },
  {
    title: '设备端口号',
    dataIndex: 'devPortNo',
  },
  {
    title: '设备状态',
    dataIndex: 'devState',
    customRender: ({ record }) => {
      return useRender().renderDictTag(record.devState, dictState.value.dsp_device_status);
    },
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
    label: '所属设备服务器',
    field: 'withServer',
    component: 'ApiSelect',
    componentProps: () => ({
      placeholder: '请选择所属设备服务器',
      api: getDevServerOptions,
      labelField: 'serverName',
      valueField: 'id',
    }),
  },
  {
    label: '设备名称',
    field: 'devName',
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备名称',
    },
  },
  {
    label: '设备类型',
    field: 'devType',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备类型',
      options: dictState.value.dsp_device_type,
    }),
  },
  {
    label: '设备端口类型',
    field: 'devPortType',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备端口类型',
      options: dictState.value.dsp_device_port_type,
    }),
  },
  {
    label: '设备地址',
    field: 'devPortAddr',
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备地址',
    },
  },
  {
    label: '设备端口号',
    field: 'devPortNo',
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备端口号',
    },
  },
  {
    label: '设备状态',
    field: 'devState',
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备状态',
      options: dictState.value.dsp_device_status,
    }),
  },
];

// 表单
export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    required: true,
    component: 'Input',
    ifShow: false,
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '所属设备服务器',
    field: 'withServer',
    required: true,
    component: 'ApiSelect',
    componentProps: () => ({
      placeholder: '请选择所属设备服务器',
      api: getDevServerOptions,
      labelField: 'serverName',
      valueField: 'id',
    }),
  },
  {
    label: '设备类型',
    field: 'devType',
    required: true,
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备类型',
      options: dictState.value.dsp_device_type,
    }),
  },
  {
    label: '设备端口类型',
    field: 'devPortType',
    required: true,
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备端口类型',
      options: dictState.value.dsp_device_port_type,
    }),
  },
  {
    label: '设备名称',
    field: 'devName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备名称',
    },
  },
  {
    label: '设备地址',
    field: 'devPortAddr',
    required: false,
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备地址',
    },
  },
  {
    label: '设备端口号',
    field: 'devPortNo',
    required: false,
    component: 'Input',
    componentProps: {
      placeholder: '请输入设备端口号',
    },
  },
  {
    label: '设备状态',
    field: 'devState',
    required: true,
    component: 'Select',
    componentProps: () => ({
      placeholder: '请选择设备状态',
      options: dictState.value.dsp_device_status,
    }),
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
