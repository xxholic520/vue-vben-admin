<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { getRoleList, exportRole, removeRole } from '@/api/system/role';
  import { RoleQuery } from '@/api/system/role/types';
  import { downloadExcel } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';
  import { columns, searchFormSchema } from './role.data';
  import RoleDrawer from './RoleDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import RoleAuthModal from './RoleAuthModal.vue';
  import { useModal } from '@/components/Modal';
  import { useGo } from '@/hooks/web/usePage';

  const go = useGo();

  const [registerTable, { reload, getForm, multipleRemove, getSelectRowKeys }] = useTable({
    api: getRoleList,
    columns,
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
      fieldMapToTime: [
        [
          'createTime',
          ['params[beginTime]', 'params[endTime]'],
          ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
        ],
      ],
    },
    rowKey: 'roleId',
    rowSelection: { type: 'checkbox' },
  });

  const [registerAuthModal, { openModal }] = useModal();

  const [registerDrawer, { openDrawer }] = useDrawer();

  function handleCreate() {
    openDrawer(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, { isUpdate: true, record });
  }

  async function handleDelete(record: Recordable) {
    await removeRole(record.roleId);
    await reload();
  }

  function handleOpenAuth(record: Recordable) {
    openModal(true, { record });
  }

  function handleOpenAssign(record: Recordable) {
    go(`/system/role-auth/user/${record.roleId}`);
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
          v-auth="'system:role:add'"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(removeRole)"
          :disabled="getSelectRowKeys().length <= 0"
          v-auth="'system:role:remove'"
        >
          删除
        </a-button>
        <a-button
          :preIcon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportRole(getForm().getFieldsValue() as RoleQuery),
              `role_${new Date().getTime()}.xlsx`,
            )
          "
          v-auth="'system:role:export'"
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
                auth: 'system:role:edit',
                ifShow: !record.superAdmin,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                label: '删除',
                auth: 'system:role:remove',
                ifShow: !record.superAdmin,
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
            :drop-down-actions="[
              {
                label: '部门权限',
                icon: 'codicon:run-all',
                ifShow: !record.superAdmin,
                auth: 'system:role:edit',
                onClick: handleOpenAuth.bind(null, record),
              },
              {
                label: '分配用户',
                icon: 'bx:comment-detail',
                auth: 'system:role:edit',
                ifShow: !record.superAdmin,
                onClick: handleOpenAssign.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!--  -->
    <RoleDrawer @register="registerDrawer" @success="reload" />
    <RoleAuthModal @register="registerAuthModal" @success="reload" />
  </PageWrapper>
</template>
