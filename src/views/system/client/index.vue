<script setup lang="ts">
  import { getClientList, exportClient, removeClient } from '@/api/system/client';
  import { PageWrapper } from '@/components/Page';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import { IconEnum } from '@/enums/appEnum';
  import { columns, searchFormSchemas } from './client.data';
  import { useTable } from '@/components/Table';
  import ClientModal from './ClientModal.vue';
  import { computed } from 'vue';
  import { useModal } from '@/components/Modal';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { downloadExcel } from '@/utils/file/download';
  import { ClientQuery } from '@/api/system/client/types';

  defineOptions({ name: 'ClientList' });

  const [registerTable, { reload, multipleRemove, getSelectRowKeys, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    api: getClientList,
    columns,
    bordered: true,
    striped: true,
    showTableSetting: true,
    showIndexColumn: false,
    rowKey: 'id',
    useSearchForm: true,
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 100,
      schemas: searchFormSchemas,
      baseColProps: {
        xs: 12,
        lg: 6,
      },
    },
    actionColumn: {
      width: 150,
      title: '操作',
      key: 'action',
      fixed: 'right',
    },
  });

  const [registerModal, { openModal }] = useModal();

  const selected = computed(() => getSelectRowKeys().length > 0);

  function handleEdit(record: Recordable) {
    openModal(true, { record, update: true });
  }

  function handleCreate() {
    openModal(true, { update: false });
  }

  async function handleDelete(record: Recordable) {
    await removeClient([record.id]);
    await reload();
  }
</script>

<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :pre-icon="IconEnum.ADD"
          @click="handleCreate"
          v-auth="'system:client:add'"
        >
          新增
        </a-button>
        <a-button
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(removeClient)"
          :disabled="!selected"
          v-auth="'system:client:remove'"
        >
          删除
        </a-button>
        <a-button
          :preIcon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportClient(getForm().getFieldsValue() as ClientQuery),
              `client_${new Date().getTime()}.xlsx`,
            )
          "
          v-auth="'system:client:export'"
        >
          导出
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                auth: 'system:client:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                color: 'error',
                auth: 'system:client:remove',
                popConfirm: {
                  placement: 'left',
                  title: `是否删除客户端[${record.clientKey}]?`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <ClientModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>
