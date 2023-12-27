<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import {
    getLoginInfoList,
    batchRemoveLogininfor,
    cleanLogininfor,
    exportLogininfor,
    unlockUser,
  } from '@/api/monitor/logininfor';
  import { columns, searchSchma } from './logininfor.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';
  import Icon from '@/components/Icon/Icon.vue';

  const { createConfirm } = useMessage();

  const [registerTable, { reload, getSelectRows, getSelectRowKeys, getForm }] = useTable({
    title: '登录日志',
    columns,
    api: getLoginInfoList,
    bordered: true,
    canResize: true,
    useSearchForm: true,
    showTableSetting: true,
    showIndexColumn: true,
    rowSelection: { type: 'checkbox' },
    formConfig: {
      labelWidth: 120,
      schemas: searchSchma,
      fieldMapToTime: [
        ['fieldTime', ['params[beginTime]', 'params[endTime]'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
    rowKey: 'infoId',
  });

  function handleDelete() {
    const infoIds = getSelectRowKeys();
    createConfirm({
      title: '系统提示',
      content: `是否确认删除访问编号为"${infoIds.join(',')}"的数据项?`,
      iconType: 'warning',
      onOk: async () => {
        await batchRemoveLogininfor(infoIds.join(','));
        reload();
      },
    });
  }

  function handleClean() {
    createConfirm({
      title: '系统提示',
      content: `是否确认清空所有登录日志数据项?`,
      iconType: 'warning',
      onOk: async () => {
        await cleanLogininfor();
        reload();
      },
    });
  }

  async function handleExport() {
    const response = await exportLogininfor(getForm().getFieldsValue());
    downloadByData(response.data, `config_${new Date().getTime()}.xlsx`);
  }

  async function handleUnlockUser() {
    const [row] = getSelectRows();
    createConfirm({
      title: '系统提示',
      content: `是否确认解锁用户"${row.userName}"数据项?`,
      iconType: 'warning',
      onOk: async () => {
        await unlockUser(row.userName);
        reload();
      },
    });
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="getSelectRowKeys().length <= 0"
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
        <a-button
          type="primary"
          :disabled="getSelectRowKeys().length !== 1"
          @click="handleUnlockUser"
          >解锁</a-button
        >
        <a-button color="warning" @click="handleExport">
          <template #icon="">
            <Icon icon="ant-design:export-outlined" />
          </template>
          导出
        </a-button>
      </template>
    </BasicTable>
  </div>
</template>
