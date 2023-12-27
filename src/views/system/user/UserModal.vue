<template>
  <BasicModal
    v-bind="$attrs"
    :width="600"
    :title="title"
    @register="registerInnerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { createUser, updateUser, getUserById, getUserDeptTree } from '@/api/system/user';
  import { modalSchemas } from './user.data';
  import { addFullName } from '@/utils/helper/treeHelper';

  defineOptions({ name: 'UserModal' });

  const emit = defineEmits(['register', 'reload']);

  const isUpdate = ref<boolean>(false);

  const title = computed<string>(() => {
    return isUpdate.value ? '编辑用户' : '新增用户';
  });

  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      resetFields();

      const { record, update } = data;
      isUpdate.value = update;
      // 在这里更新主要是打开编辑/新增 会有一个明显的隐藏/显示效果 不美观
      await updateSchema([
        {
          field: 'userName',
          componentProps: {
            disabled: update,
          },
        },
        {
          field: 'password',
          ifShow: !update,
        },
      ]);
      const response = record ? await getUserById(record.userId) : await getUserById();
      // 外部的roleIds postIds才是真正对应的  新增时为空
      const { postIds = [], roleIds = [], user, roles, posts } = response;
      // user不为空为更新
      if (user) {
        user.postIds = postIds;
        user.roleIds = roleIds;
      }
      // updateSchema
      const deptTree = await getUserDeptTree();
      // 选中后显示在输入框的值 即父节点 >> 子节点
      addFullName(deptTree, 'label', ' >> ');
      // 岗位下拉框
      const deptOptions = posts;
      // 角色
      const roleOptions = roles;
      await updateSchema([
        {
          field: 'deptId',
          componentProps: {
            treeData: deptTree,
            fieldNames: { value: 'id', label: 'label' },
            treeDefaultExpandAll: true,
            treeLine: { showLeafIcon: false },
            // 选中后显示在输入框的值
            treeNodeLabelProp: 'fullName',
          },
        },
        {
          field: 'postIds',
          componentProps: {
            options: deptOptions,
            fieldNames: { label: 'postName', value: 'postId' },
            // 搜索
            optionFilterProp: 'postName',
            mode: 'multiple',
          },
        },
        {
          field: 'roleIds',
          componentProps: {
            options: roleOptions,
            fieldNames: { label: 'roleName', value: 'roleId' },
            // 搜索
            optionFilterProp: 'roleName',
            mode: 'multiple',
          },
        },
      ]);

      // 更新信息
      if (user && update) {
        await setFieldsValue(user);
      }
    },
  );

  const [registerForm, { setFieldsValue, validate, updateSchema, resetFields }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate();
      if (unref(isUpdate)) {
        await updateUser(data);
      } else {
        await createUser(data);
      }
      closeModal();
      emit('reload');
    } catch (e) {
      //
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style scoped></style>
