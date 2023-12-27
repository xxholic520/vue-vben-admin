<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useModal } from '@/components/Modal';
  import { getPostList, exportPost, removePost } from '@/api/system/post';
  import { PostQuery } from '@/api/system/post/types';
  import { downloadExcel } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';
  import PostModal from './PostModal.vue';
  import { columns, searchFormSchema } from './post.data';

  const [registerTable, { reload, getForm, multipleRemove, getSelectRowKeys }] = useTable({
    api: getPostList,
    columns,
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
    formConfig: {
      autoSubmitOnEnter: true,
      labelWidth: 120,
      schemas: searchFormSchema,
      baseColProps: { lg: 6, xs: 12 },
    },
    rowKey: 'postId',
    rowSelection: { type: 'checkbox' },
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { isUpdate: true, record });
  }

  async function handleDelete(record: Recordable) {
    await removePost(record.id);
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
          v-auth="'system:post:add'"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(removePost)"
          :disabled="getSelectRowKeys().length <= 0"
          v-auth="'system:post:remove'"
        >
          删除
        </a-button>
        <a-button
          :preIcon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportPost(getForm().getFieldsValue() as PostQuery),
              `post_${new Date().getTime()}.xlsx`,
            )
          "
          v-auth="'system:post:export'"
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
                auth: 'system:post:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除',
                auth: 'system:post:remove',
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
    <PostModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>
