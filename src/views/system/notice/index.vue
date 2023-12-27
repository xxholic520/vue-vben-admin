<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          :pre-icon="IconEnum.ADD"
          @click="handleAdd"
          v-auth="'system:notice:add'"
        >
          新增公告
        </a-button>
        <a-button
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(noticeRemove)"
          :disabled="!selected"
          v-auth="'system:notice:remove'"
        >
          选中删除
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                auth: 'system:notice:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                color: 'error',
                auth: 'system:notice:remove',
                popConfirm: {
                  placement: 'left',
                  title: `是否删除公告[${record.noticeTitle}]?`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <NoticeModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { noticeList, noticeRemove } from '@/api/system/notice';
  import { useModal } from '@/components/Modal';
  import NoticeModal from './NoticeModal.vue';
  import { formSchems, columns } from './notice.data';
  import { IconEnum } from '@/enums/appEnum';
  import { computed } from 'vue';

  defineOptions({ name: 'Notice' });

  const [registerTable, { reload, multipleRemove, getSelectRowKeys }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    showIndexColumn: true,
    api: noticeList,
    rowKey: 'noticeId',
    useSearchForm: true,
    formConfig: {
      schemas: formSchems,
      labelWidth: 100,
      baseColProps: {
        span: 6,
      },
    },
    columns: columns,
    actionColumn: {
      width: 200,
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
    await noticeRemove([record.configId]);
    await reload();
  }
</script>

<style scoped></style>
