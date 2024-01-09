<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import { columns, searchFormSchema } from './config.data';
  import { getConfigList, removeConfig, exportConfig } from '@/api/system/config';
  import { useModal } from '@/components/Modal';
  import ConfigModal from './ConfigModal.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useLoading } from '@/components/Loading';
  import { ConfigQuery } from '@/api/system/config/types';
  import { promiseTimeout } from '@vueuse/core';
  import { downloadByData } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';

  const { createConfirm } = useMessage();

  const [registerTable, { reload, getSelectRowKeys, getForm }] = useTable({
    title: '参数设置',
    api: getConfigList,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      baseColProps: { span: 6 },
      fieldMapToTime: [
        ['createTime', ['params[beginTime]', 'params[endTime]'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
    columns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    rowSelection: { type: 'checkbox' },
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    rowKey: 'configId',
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { isUpdate: true, record });
  }

  function handleDelete(record: Recordable) {
    return removeConfig(record.configId).then(reload);
  }

  function handleBatchDelete() {
    const configIds = getSelectRowKeys();
    createConfirm({
      title: '系统提示',
      content: `是否确认删除参数编号为"${configIds.join(',')}"的数据项？`,
      iconType: 'warning',
      onOk: async () => {
        await removeConfig(configIds);
      },
    });
  }

  const [openLoading, closeLoading] = useLoading({
    target: document.body,
    props: { tip: '正在下载数据，请稍候' },
  });

  async function handleExport() {
    openLoading();
    await promiseTimeout(1500);
    const response = await exportConfig(getForm().getFieldsValue() as ConfigQuery);
    downloadByData(response.data, `config_${new Date().getTime()}.xlsx`);
    closeLoading();
  }

  function handleRefreshCache() {}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate"> 新增 </a-button>
        <a-button
          type="primary"
          :pre-icon="IconEnum.DELETE"
          danger
          :disabled="getSelectRowKeys().length <= 0"
          @click="handleBatchDelete"
        >
          删除
        </a-button>
        <a-button :pre-icon="IconEnum.EXPORT" color="warning" @click="handleExport">
          导出
        </a-button>
        <a-button :pre-icon="IconEnum.REFRESH" @click="handleRefreshCache"> 刷新缓存 </a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :stopButtonPropagation="true"
            :actions="[
              {
                icon: IconEnum.EDIT,
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                label: '删除',
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

    <ConfigModal @register="registerModal" @success="reload" />
  </div>
</template>
