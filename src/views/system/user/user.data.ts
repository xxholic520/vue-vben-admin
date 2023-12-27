import { BasicColumn } from '@/components/Table';
import { FormSchema, Rule } from '@/components/Form';
import { useDict } from '@/utils/helper/dictHelper';
import { useRender } from '@/hooks/component/useRender';
import { changeUserStatus } from '@/api/system/user';

const dictState = useDict('sys_normal_disable', 'sys_user_sex');

const PHONE_PATTERN = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
const EMIAL_PATTERN = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

interface RuleItem {
  phone: Rule[];
  email: Rule[];
}

function useFormRules(
  required = false,
  trigger: 'blur' | 'change' | ['change', 'blur'] = 'change',
): RuleItem {
  const phone: Rule[] = [
    { required, message: '请输入正确的手机号码', pattern: PHONE_PATTERN, trigger },
  ];
  const email: Rule[] = [
    { required, message: '请输入正确的邮箱地址', pattern: EMIAL_PATTERN, trigger },
  ];

  return {
    phone,
    email,
  };
}

export const columns: BasicColumn[] = [
  {
    dataIndex: 'userName',
    title: '名称',
  },
  {
    dataIndex: 'nickName',
    title: '昵称',
  },
  {
    dataIndex: 'deptId',
    title: '部门',
    customRender({ record }) {
      return record.dept?.deptName ?? '未知部门';
    },
  },
  {
    dataIndex: 'phonenumber',
    title: '手机号',
  },
  // {
  //   dataIndex: 'status',
  //   title: '状态',
  // },
  {
    dataIndex: 'status',
    title: '状态',
    customRender({ record }) {
      return useRender().renderSwitch(record, changeUserStatus);
    },
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
  },
];

const { phone, email } = useFormRules();
export const schemas: FormSchema[] = [
  {
    field: 'userName',
    label: '用户账号',
    component: 'Input',
  },
  {
    field: 'nickName',
    label: '用户昵称',
    component: 'Input',
  },
  {
    field: 'phonenumber',
    label: '手机号码',
    component: 'Input',
    rules: phone,
  },
  {
    field: 'status',
    label: '用户状态',
    component: 'Select',
    componentProps: () => ({
      options: dictState.value.sys_normal_disable,
    }),
  },
  {
    field: 'createTime',
    label: '创建时间',
    component: 'RangePicker',
  },
];

export const modalSchemas: FormSchema[] = [
  {
    label: '用户ID',
    field: 'userId',
    component: 'Input',
    show: false,
  },
  {
    label: '用户账号',
    field: 'userName',
    component: 'Input',
    componentProps: {
      id: 'modal-userName',
    },
    required: true,
  },
  {
    label: '用户密码',
    field: 'password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '输入密码, 长度5-20',
    },
    rules: [{ required: true, message: '输入密码, 长度5-20', min: 5, max: 20, trigger: 'blur' }],
  },
  {
    label: '用户昵称',
    field: 'nickName',
    component: 'Input',
    componentProps: {
      id: 'modal-nickName',
    },
    required: true,
  },
  {
    label: '归属部门',
    field: 'deptId',
    required: true,
    component: 'TreeSelect',
    helpMessage: ['注意绑定的角色要带相应的部门权限, 否则无法正常登录'],
  },
  {
    label: '手机号',
    field: 'phonenumber',
    component: 'Input',
    componentProps: {
      id: 'modal-phonenumber',
    },
    rules: phone,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    rules: email,
  },
  {
    label: '用户性别',
    field: 'sex',
    defaultValue: '0',
    component: 'RadioButtonGroup',
    componentProps: () => ({
      options: dictState.value.sys_user_sex,
    }),
    colProps: { span: 12 },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: '0',
    component: 'RadioButtonGroup',
    componentProps: () => ({
      options: dictState.value.sys_normal_disable,
    }),
    colProps: { span: 12 },
  },
  {
    label: '岗位',
    field: 'postIds',
    component: 'Select',
    defaultValue: [],
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'Select',
    defaultValue: [],
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const resetPasswordSchemas: FormSchema[] = [
  {
    field: 'userId',
    component: 'Input',
    label: '用户ID',
    defaultValue: -1,
    required: true,
    show: false,
  },
  {
    field: 'password',
    component: 'StrengthMeter',
    label: '新的密码',
    componentProps: {
      id: 'reset_password',
      placeholder: '请输入新的密码, 密码长度为5 - 20',
    },
    rules: [{ required: true, min: 5, max: 20, message: '密码长度为5 - 20' }],
  },
];
