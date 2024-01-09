<script setup lang="ts">
  import { exportDictData, getDictDataList, removeDictData } from '@/api/system/dict/data';
  import { getDictTypeById } from '@/api/system/dict/type';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import { useRouter } from 'vue-router';
  import { ref, unref } from 'vue';
  import { columns, searchSchema } from './data.data';
  import DictDataModal from './DictDataModal.vue';
  import { useModal } from '@/components/Modal';
  import { usePermission } from '@/hooks/web/usePermission';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useLoading } from '@/components/Loading';
  import { promiseTimeout } from '@vueuse/core';
  import { downloadByData } from '@/utils/file/download';
  import { DictDataQuery } from '@/api/system/dict/data/types';
  import { IconEnum } from '@/enums/appEnum';

  const dictId = useRouter().currentRoute.value.params.dictId;
  const dictType = ref<string | undefined>(undefined);

  const { createConfirm } = useMessage();
  const { hasPermission } = usePermission();

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload, getSelectRowKeys, getForm }] = useTable({
    api: getDictDataList,
    beforeFetch: async () => {
      if (typeof unref(dictType) === 'undefined') {
        const dict = await getDictTypeById(dictId as string);
        dictType.value = dict.dictType;
        getForm().setFieldsValue({ dictType: dict.dictType });
        return { dictType: unref(dictType) };
      }
    },
    handleSearchInfoFn: (info) => {
      if (!info.dictType) {
        getForm().setFieldsValue({ dictType: unref(dictType) });
        return { dictType: unref(dictType) };
      }
    },
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
      fixed: 'right',
    },
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 120,
      schemas: searchSchema,
      baseColProps: { span: 6 },
      fieldMapToTime: [],
    },
    rowSelection: { type: 'checkbox' },
    rowKey: 'dictCode',
  });

  function handleCreate() {
    openModal(true, { isUpdate: false, record: { dictType: unref(dictType) } });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { isUpdate: true, record });
  }

  async function handleDelete(record: Recordable) {
    const { dictCode } = record;
    await removeDictData(dictCode);
    reload();
  }

  function handleBatchDelete() {
    const dictCodes = getSelectRowKeys();
    console.log(dictCodes);
    createConfirm({
      title: '系统提示',
      content: `是否确认删除字典编码为"${dictCodes.join(',')}"的数据项？`,
      iconType: 'warning',
      onOk: async () => {
        await removeDictData(dictCodes as string[]);
        reload();
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
    const response = await exportDictData(getForm().getFieldsValue() as DictDataQuery);
    downloadByData(response.data, `dict_data_${new Date().getTime()}.xlsx`);
    closeLoading();
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :pre-icon="IconEnum.ADD"
          v-if="hasPermission('system:dict:add')"
          @click="handleCreate"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :pre-icon="IconEnum.DELETE"
          danger
          :disabled="getSelectRowKeys().length <= 0"
          v-if="hasPermission('system:dict:remove')"
          @click="handleBatchDelete"
        >
          删除
        </a-button>
        <a-button
          :pre-icon="IconEnum.EXPORT"
          color="warning"
          v-if="hasPermission(['system:dict:export'])"
          @click="handleExport"
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
                icon: IconEnum.EDIT,
                label: '编辑',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission('system:dict:edit'),
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

    <DictDataModal @register="registerModal" @success="reload" />
  </div>
</template>
