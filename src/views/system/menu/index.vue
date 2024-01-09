<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable } from '@/components/Table';
  import { getMenuList, removeMenu } from '@/api/system/menu';
  import type { MenuQuery } from '@/api/system/menu/types';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { eachTree, listToTree } from '@/utils/helper/treeHelper';
  import { useDrawer } from '@/components/Drawer';
  import { columns, searchFormSchema } from './menu.data';
  import MenuDrawer from './MenuDrawer.vue';
  import { useToggle } from '@vueuse/core';
  import { unref } from 'vue';
  import { IconEnum } from '@/enums/appEnum';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload, expandAll, collapseAll }] = useTable({
    api: renderTreeList,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    columns,
    isTreeTable: true,
    pagination: false,
    // striped: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    rowKey: 'menuId',
  });

  const [isExpand, toggle] = useToggle();

  // 生成菜单树列表
  async function renderTreeList(query?: MenuQuery) {
    const treeList = listToTree(await getMenuList(query), { id: 'menuId', pid: 'parentId' });
    eachTree(treeList, (item) => {
      if (item.children.length <= 0) {
        item.children = undefined;
      }
    });
    return treeList;
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    const { menuId } = record;
    await removeMenu(menuId);
    await reload();
  }

  function handleSuccess() {
    reload();
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
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate"> 新增 </a-button>
        <a-button type="primary" :pre-icon="IconEnum.EXPAND" @click="toggleExpand">
          展开/折叠
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
