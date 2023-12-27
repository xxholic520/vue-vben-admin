<script setup lang="ts">
  import { roleUnallocatedList, roleSelectAll } from '@/api/system/role';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import { columns, searchFormSchemas } from './auth.data';
  import { reactive } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['register', 'success']);

  const { createMessage } = useMessage();

  const state = reactive({
    roleId: '',
  });

  const [registerModal, { getOpen, setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({ confirmLoading: false });
    const { roleId } = data;
    state.roleId = roleId;
    setProps({ searchInfo: { roleId } });
  });

  const [registerTable, { setProps, getSelectRowKeys, clearSelectedRowKeys }] = useTable({
    api: roleUnallocatedList,
    columns,
    useSearchForm: true,
    bordered: true,
    // isCanResizeParent: true,
    // canResize: true,
    inset: true,
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 80,
      schemas: searchFormSchemas,
      baseColProps: { span: 8 },
    },
    rowKey: 'userId',
    rowSelection: { type: 'checkbox' },
    maxHeight: 320,
  });

  async function handleSubmit() {
    setModalProps({ confirmLoading: true });
    const userIds = getSelectRowKeys();
    if (userIds.length <= 0) {
      createMessage.warning('请选择要分配的用户');
      return;
    }
    try {
      await roleSelectAll(state.roleId, userIds);
      clearSelectedRowKeys();
      closeModal();
      emit('success');
    } catch (error) {
      //
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="选择用户"
    :width="1200"
    :can-fullscreen="false"
    :destroy-on-close="true"
    :use-wrapper="false"
    @ok="handleSubmit"
  >
    <BasicTable v-if="getOpen" @register="registerTable" />
  </BasicModal>
</template>
