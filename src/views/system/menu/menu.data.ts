import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 180,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '正常' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];

const isDir = (type: string) => type === 'M';
const isMenu = (type: string) => type === 'C';
const isButton = (type: string) => type === 'F';

export const formSchema: FormSchema[] = [
  { field: 'menuId', component: 'Input', show: false },
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'M',
    componentProps: {
      options: [
        { label: '目录', value: 'M' },
        { label: '菜单', value: 'C' },
        { label: '按钮', value: 'F' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    defaultValue: 0,
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'menuId',
        value: 'menuId',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'orderNum',
    label: '显示排序',
    defaultValue: '1',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'path',
    label: '路由地址',
    helpMessage: '访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'component',
    label: '组件路径',
    helpMessage: '访问的组件路径，如：`system/user/index`，默认在`views`目录下',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'perms',
    label: '权限标识',
    helpMessage: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)",
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'queryParam',
    label: '路由参数',
    helpMessage: '访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'isCache',
    label: '是否缓存',
    helpMessage: '选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '缓存', value: '0' },
        { label: '不缓存', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'isFrame',
    label: '是否外链',
    helpMessage: '选择是外链则路由地址需要以`http(s)://`开头',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'visible',
    label: '显示状态',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ],
    },
  },
  {
    field: 'status',
    label: '菜单状态',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];
