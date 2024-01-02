<script setup lang="ts">
  import {
    batchRemoveOperLog,
    cleanOperLog,
    getOperlogList,
    exportOperLog,
  } from '@/api/monitor/operlog';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './operlog.data';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useModal } from '@/components/Modal';
  import DescriptionModal from './DescriptionModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';

  const { createConfirm } = useMessage();

  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys, getForm }] = useTable({
    title: '操作日志',
    api: getOperlogList,
    columns,
    bordered: true,
    canResize: true,
    useSearchForm: true,
    showTableSetting: true,
    showIndexColumn: true,
    indexColumnProps: { width: 80 },
    rowSelection: { type: 'checkbox' },
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      fieldMapToTime: [
        ['fieldTime', ['params[beginTime]', 'params[endTime]'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
  });

  const [registerDescriptionModal, { openModal }] = useModal();

  function handleView(record: Recordable) {
    openModal(true, record);
  }

  function handleDelete() {
    const rows = getSelectRows();
    const operIds = rows.map((row) => row.operId);
    createConfirm({
      title: '系统提示',
      content: `是否确认删除日志编号为"${operIds}"的数据项?`,
      iconType: 'warning',
      onOk: async () => {
        await batchRemoveOperLog(operIds);
        clearSelectedRowKeys();
        reload();
      },
    });
    console.log(rows);
  }

  function handleClean() {
    createConfirm({
      title: '系统提示',
      content: '是否确认清空所有操作日志数据项?',
      iconType: 'warning',
      onOk: async () => {
        await cleanOperLog();
        reload();
      },
    });
  }

  async function handleExport() {
    const response = await exportOperLog(getForm().getFieldsValue());
    downloadByData(response.data, `config_${new Date().getTime()}.xlsx`);
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="getSelectRows().length <= 0"
          danger
          @click="handleDelete"
        >
          <template #icon>
            <Icon icon="ant-design:delete-outlined" />
          </template>
          删除
        </a-button>
        <a-button type="primary" danger @click="handleClean">
          <template #icon>
            <Icon icon="ant-design:warning-outlined" />
          </template>
          清空
        </a-button>
        <a-button color="warning" @click="handleExport">
          <template #icon="">
            <Icon icon="ant-design:export-outlined" />
          </template>
          导出
        </a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :stopButtonPropagation="true"
            :actions="[
              {
                icon: 'ant-design:eye-twotone',
                tooltip: '详情',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!--  -->
    <DescriptionModal @register="registerDescriptionModal" />
  </div>
</template>
