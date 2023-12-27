<script setup lang="ts">
  import { roleAllocatedList, roleAuthCancel, roleAuthCancelAll } from '@/api/system/role';
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchemas } from './auth.data';
  import { useRoute } from 'vue-router';
  import { IconEnum } from '@/enums/appEnum';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useTabs } from '@/hooks/web/useTabs';
  import SelectUserModal from './SelectUserModal.vue';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const route = useRoute();

  const { createConfirm } = useMessage();

  const [registerTable, { reload, getSelectRowKeys, clearSelectedRowKeys }] = useTable({
    api: roleAllocatedList,
    columns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    searchInfo: { roleId: route.params.roleId },
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 120,
      schemas: searchFormSchemas,
      baseColProps: { lg: 6, xs: 12 },
    },
    rowKey: 'userId',
    rowSelection: { type: 'checkbox' },
  });

  const { close } = useTabs();

  const [registerModal, { openModal }] = useModal();

  function handleAdd() {
    openModal(true, { roleId: route.params.roleId });
  }

  function handleCloseTab() {
    close();
  }

  async function handleCancelAuthUser(record: Recordable) {
    const { userId } = record;
    await roleAuthCancel({ userId, roleId: route.params.roleId });
    clearSelectedRowKeys();
    await reload();
  }

  function handleRoleAuthCancelAll() {
    createConfirm({
      title: '系统提示',
      content: '是否取消选中用户授权数据项?',
      iconType: 'warning',
      onOk: async () => {
        await roleAuthCancelAll(route.params.roleId as string, getSelectRowKeys());
        clearSelectedRowKeys();
        await reload();
      },
    });
  }
</script>

<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleAdd"> 添加用户 </a-button>
        <a-button
          type="primary"
          danger
          :pre-icon="'ant-design:close-circle-outlined'"
          :disabled="getSelectRowKeys().length <= 0"
          @click="handleRoleAuthCancelAll"
        >
          批量取消授权
        </a-button>
        <a-button color="warning" pre-icon="ant-design:close-outlined" @click="handleCloseTab">
          关闭
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stop-button-propagation
            :actions="[
              {
                icon: 'ant-design:close-circle-outlined',
                color: 'error',
                tooltip: '取消授权',
                popConfirm: {
                  title: `确认要取消该用户${record.userName}角色吗?`,
                  placement: 'left',
                  confirm: handleCancelAuthUser.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!--  -->
    <SelectUserModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>
