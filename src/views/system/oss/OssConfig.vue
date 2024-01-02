<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Space>
          <a-button
            type="primary"
            :pre-icon="IconEnum.ADD"
            @click="handleAdd"
            v-auth="'system:oss:add'"
            >新增配置</a-button
          >
          <a-button
            :preIcon="IconEnum.DELETE"
            danger
            @click="multipleRemove(ossConfigRemove)"
            :disabled="!selected"
            v-auth="'system:oss:edit'"
            >选中删除</a-button
          >
        </Space>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                auth: 'system:oss:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                color: 'error',
                auth: 'system:oss:edit',
                popConfirm: {
                  placement: 'left',
                  title: `是否删除oss配置[${record.configKey}]?`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <OssConfigModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Space } from 'ant-design-vue';
  import { ossConfigList, ossConfigRemove } from '@/api/system/oss/config';
  import { useModal } from '@/components/Modal';
  import OssConfigModal from './OssConfigModal.vue';
  import { formSchems, columns } from './oss.config.data';
  import { IconEnum } from '@/enums/appEnum';
  import { computed } from 'vue';

  defineOptions({ name: 'OssConfigIndex' });

  const [registerTable, { reload, getSelectRowKeys, multipleRemove }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    showIndexColumn: false,
    api: ossConfigList,
    rowKey: 'ossConfigId',
    useSearchForm: true,
    bordered: true,
    beforeFetch: (params: Recordable) => {
      if (params.status) {
        params.status = params.status === 'Y' ? 0 : 1;
      }
      return params;
    },
    formConfig: {
      schemas: formSchems,
      labelWidth: 120,
      baseColProps: {
        span: 6,
      },
    },
    columns: columns,
    actionColumn: {
      width: 160,
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

  function handleAdd() {
    openModal(true, { update: false });
  }

  async function handleDelete(record: Recordable) {
    await ossConfigRemove([record.ossConfigId]);
    await reload();
  }
</script>

<style scoped></style>
