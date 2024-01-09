<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useModal } from '@/components/Modal';
  import { getDeptList, removeDept } from '@/api/system/dept';
  import { DeptQuery } from '@/api/system/dept/types';
  import { IconEnum } from '@/enums/appEnum';
  import { unref } from 'vue';
  import DeptModal from './DeptModal.vue';
  import { columns, searchFormSchema } from './dept.data';
  import { eachTree, listToTree } from '@/utils/helper/treeHelper';
  import { useToggle } from '@vueuse/core';

  const [registerTable, { reload, expandAll, collapseAll }] = useTable({
    api: renderTreeList,
    columns,
    isTreeTable: true,
    pagination: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    actionColumn: {
      width: 220,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 120,
      schemas: searchFormSchema,
      baseColProps: { lg: 6, xs: 12 },
    },
    rowKey: 'deptId',
    expandRowByClick: true,
  });

  const [isExpand, toggle] = useToggle();

  const [registerModal, { openModal }] = useModal();

  async function renderTreeList(query?: DeptQuery) {
    const treeList = listToTree(await getDeptList(query), { id: 'deptId', pid: 'parentId' });
    eachTree(treeList, (item) => {
      if (item.children.length <= 0) {
        item.children = undefined;
      }
    });
    return treeList;
  }

  function handleCreate(record?: Recordable) {
    openModal(true, { isUpdate: false, record });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { isUpdate: true, record });
  }

  async function handleDelete(record: Recordable) {
    await removeDept(record.deptId);
    await reload();
  }

  function toggleExpand() {
    toggle();
    if (unref(isExpand)) {
      expandAll();
    } else {
      collapseAll();
    }
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
          v-auth="'system:dept:add'"
        >
          新增
        </a-button>
        <a-button type="primary" :pre-icon="IconEnum.EXPAND" @click="toggleExpand">
          展开/折叠
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
                auth: 'system:dept:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: IconEnum.ADD,
                label: '新增',
                auth: 'system:dept:add',
                onClick: handleCreate.bind(null, record),
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                label: '删除',
                auth: 'system:dept:remove',
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
    <DeptModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>
