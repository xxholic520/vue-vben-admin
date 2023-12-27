<script setup lang="ts">
  import {
    exportDictType,
    getDictTypeList,
    refreshDictCache,
    removeDictType,
  } from '@/api/system/dict/type';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import { columns, searchSchma } from './dict.data';
  import DictTypeModal from './DictTypeModal.vue';
  import { useModal } from '@/components/Modal';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { usePermission } from '@/hooks/web/usePermission';
  import { DictTypeQuery } from '@/api/system/dict/type/types';
  import { downloadExcel } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';

  const { hasPermission } = usePermission();

  const [registerTable, { reload, getSelectRowKeys, getForm, multipleRemove }] = useTable({
    api: getDictTypeList,
    columns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    canResize: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 120,
      schemas: searchSchma,
      baseColProps: { span: 6 },
      fieldMapToTime: [
        ['fieldTime', ['params[beginTime]', 'params[endTime]'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
    rowSelection: { type: 'checkbox' },
    rowKey: 'dictId',
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { record, isUpdate: true });
  }

  async function handleDelete(record: Recordable) {
    const { dictId } = record;
    await removeDictType(dictId);
    await reload();
  }

  async function handleRefreshCache() {
    await refreshDictCache();
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :pre-icon="IconEnum.ADD"
          @click="handleCreate"
          v-if="hasPermission('system:dict:add')"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :pre-icon="IconEnum.DELETE"
          danger
          :disabled="getSelectRowKeys().length <= 0"
          @click="multipleRemove(removeDictType)"
          v-if="hasPermission('system:dict:remove')"
        >
          删除
        </a-button>
        <a-button
          :pre-icon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportDictType(getForm().getFieldsValue() as DictTypeQuery),
              `dict_type_${new Date().getTime()}.xlsx`,
            )
          "
          v-if="hasPermission(['system:dict:export'])"
        >
          导出
        </a-button>
        <a-button
          :pre-icon="IconEnum.REFRESH"
          v-if="hasPermission('system:dict:remove')"
          @click="handleRefreshCache"
        >
          刷新缓存
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :stopButtonPropagation="true"
            :actions="[
              {
                icon: IconEnum.EDIT,
                label: '编辑',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission('system:dict:edit2'),
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                label: '删除',
                ifShow: hasPermission('system:dict:remove'),
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

    <DictTypeModal @register="registerModal" @success="reload" />
  </div>
</template>
