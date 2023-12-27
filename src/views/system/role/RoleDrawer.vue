<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    :width="600"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          ref="treeRef"
          v-model:value="model[field]"
          :check-strictly="menuCheckStrictly"
          :treeData="treeData"
          :fieldNames="getFieldNames"
          toolbar
          checkable
          :selectable="false"
          title="菜单分配"
          @check="onCheck"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, CheckKeys, TreeActionType, TreeItem } from '@/components/Tree';
  import { getMenuTreeSelect, getRoleMenuTreeSelect } from '@/api/system/menu';
  import { createRole, updateRole, getRoleById } from '@/api/system/role';
  import { findGroupParentIds } from '@/utils/helper/treeHelper';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    model: {
      roleId: undefined,
      roleName: undefined,
      roleKey: undefined,
      roleSort: undefined,
      dataScope: undefined,
      menuCheckStrictly: undefined,
      deptCheckStrictly: undefined,
      status: undefined,
      remark: undefined,
    },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    checkedMenuKeys.value = [];
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // if (unref(treeData).length === 0) {
    //   treeData.value = await getMenuTreeSelect();
    // }

    if (unref(isUpdate)) {
      const record = await getRoleById(data.record.roleId);
      const ret = await getRoleMenuTreeSelect(data.record.roleId);
      menuCheckStrictly.value = !record.menuCheckStrictly;
      treeData.value = ret.menus as any as TreeItem[];
      await setFieldsValue({ ...record });
      const { menus, checkedKeys } = ret;
      if (record.menuCheckStrictly) {
        const parentIds = findGroupParentIds(menus, checkedKeys);
        checkedMenuKeys.value = [...parentIds, ...checkedKeys];
      } else {
        checkedMenuKeys.value = checkedKeys;
      }
      await setFieldsValue({ menuIds: checkedKeys });
    } else {
      treeData.value = (await getMenuTreeSelect()) as any as TreeItem[];
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  const checkedMenuKeys = ref<(string | number)[]>([]);
  const menuCheckStrictly = ref(false);
  const treeRef = ref<TreeActionType>();
  const getFieldNames = computed(() => ({ title: 'label', key: 'id', children: 'children' }));

  // const treeConfig = { id: 'id', pid: 'parentId', children: 'children' };
  // 自定义选择
  function onCheck(checkedKeys: CheckKeys, e) {
    if (checkedKeys instanceof Array) {
      const halfCheckedKeys: number[] = (e.halfCheckedKeys || []) as number[];
      checkedMenuKeys.value = [...halfCheckedKeys, ...checkedKeys];
      // 由于点击按钮 层级关联/独立并不会更新  需要在这里自行更改
      menuCheckStrictly.value = false;
    } else {
      checkedMenuKeys.value = [...checkedKeys.checked];
      menuCheckStrictly.value = true;
    }
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      values.menuCheckStrictly = !unref(menuCheckStrictly);
      values.menuIds = [...unref(checkedMenuKeys)];
      if (unref(isUpdate)) {
        await updateRole(values);
      } else {
        await createRole(values);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
