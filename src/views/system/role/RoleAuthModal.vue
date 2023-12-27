<template>
  <BasicModal
    v-bind="$attrs"
    title="分配权限"
    :width="600"
    :min-height="350"
    @register="registerInnerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #deptTree="{ model, field }">
        <Card>
          <BasicTree
            title="部门分配"
            v-if="roleDeptTreeList.length"
            defaultExpandAll
            :tree-data="roleDeptTreeList"
            :fieldNames="{ title: 'label', key: 'id' }"
            checkable
            search
            toolbar
            :checkStrictly="deptCheckStrictly"
            :strictly-btn="true"
            v-model:checkedKeys="model[field]"
            @check="handleChecked"
          />
        </Card>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref } from 'vue';
  import { getRoleById, roleDataScope, getRoleDeptTree } from '@/api/system/role';
  import { Card } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { authSchemas } from './role.data';
  import { CheckInfo } from 'ant-design-vue/es/vc-tree/props';
  import { findGroupParentIds } from '@/utils/helper/treeHelper';

  defineOptions({ name: 'RoleAuthModal' });

  const emit = defineEmits(['register', 'success']);

  const roleDeptTreeList = ref<any[]>([]);
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  const deptCheckStrictly = ref<boolean>(false);

  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: { record: Recordable }) => {
      resetFields();
      clearValidate();
      checkedDeptKeys.value = [];

      const { record } = data;
      const ret = await getRoleById(record.roleId);
      /** 是否节点独立/关联  后台返回的字段和antd是反的 */
      deptCheckStrictly.value = !ret.deptCheckStrictly;
      await setFieldsValue(ret);
      // tree 拿到tree数据和选中
      const response = await getRoleDeptTree(ret.roleId);
      const { depts, checkedKeys } = response;
      roleDeptTreeList.value = depts;
      /** 在关联情况下 checkedKeys不包含父节点 */
      if (ret.deptCheckStrictly) {
        const parentIds = findGroupParentIds(depts, checkedKeys, { pid: 'parentId' });
        checkedDeptKeys.value = [...parentIds, ...checkedKeys];
      } else {
        checkedDeptKeys.value = checkedKeys;
      }
      /** 设置选中的菜单ID */
      await setFieldsValue({ deptIds: checkedKeys });
    },
  );

  const [registerForm, { setFieldsValue, validate, resetFields, clearValidate }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: authSchemas,
  });

  /** 已经选择的所有节点  包括子/父节点 */
  const checkedDeptKeys = ref<(string | number)[]>([]);

  type CheckedState<T = string | number> = T[] | { checked: T[]; halfChecked: T[] };
  function handleChecked(checkedKeys: CheckedState, info: CheckInfo) {
    // 数组的话为节点关联
    if (checkedKeys instanceof Array) {
      const halfCheckedKeys: number[] = (info.halfCheckedKeys || []) as number[];
      checkedDeptKeys.value = [...halfCheckedKeys, ...checkedKeys];
      // 由于点击按钮 层级关联/独立并不会更新  需要在这里自行更改
      deptCheckStrictly.value = false;
    } else {
      checkedDeptKeys.value = [...checkedKeys.checked];
      deptCheckStrictly.value = true;
    }
  }

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate();
      // 不为自定义权限的话 删除部门id
      if (data.dataScope !== '2') {
        data.deptIds = [];
      } else {
        data.deptCheckStrictly = !deptCheckStrictly.value;
        data.deptIds = checkedDeptKeys.value;
      }
      await roleDataScope(data);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style scoped>
  :deep(.ant-card-body) {
    padding: 0;
  }
</style>
