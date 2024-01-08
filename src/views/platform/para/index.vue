<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useModal } from '@/components/Modal';
  import { getParaList, exportPara, removePara } from '@/api/platform/para';
  import { ParaQuery } from '@/api/platform/para/types';
  import { downloadExcel } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';
  import ParaModal from './ParaModal.vue';
  import { columns, searchFormSchema } from './para.data';

  const [registerTable, { reload, getForm, multipleRemove, getSelectRowKeys }] = useTable({
    api: getParaList,
    searchInfo: { orderByColumn: 'paraOrder', isAsc: 'asc' },
    columns,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    formConfig: {
      autoSubmitOnEnter: true,
      schemas: searchFormSchema,
      baseColProps: { lg: 4, xs: 12 },
      showResetButton: false,
      showSubmitButton: false,
      submitOnChange: true,
    },
    rowKey: 'id',
    rowSelection: { type: 'checkbox' },
    immediate: false,
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { isUpdate: true, record });
  }

  async function handleDelete(record: Recordable) {
    await removePara(record.id);
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
          v-auth="'platform:para:add'"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(removePara)"
          :disabled="getSelectRowKeys().length <= 0"
          v-auth="'platform:para:remove'"
        >
          删除
        </a-button>
        <a-button
          :preIcon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportPara(getForm().getFieldsValue() as ParaQuery),
              `para_${new Date().getTime()}.xlsx`,
            )
          "
          v-auth="'platform:para:export'"
        >
          导出
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :stopButtonPropagation="true"
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑',
                auth: 'platform:para:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除',
                auth: 'platform:para:remove',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!--  -->
    <ParaModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>
