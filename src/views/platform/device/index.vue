<script setup lang="ts">
  import { useTable } from '@/components/Table';
  import BasicTable from '@/components/Table/src/BasicTable.vue';
  import TableAction from '@/components/Table/src/components/TableAction.vue';
  import { useModal } from '@/components/Modal';
  import { getDeviceList, exportDevice, removeDevice } from '@/api/platform/device';
  import { DeviceQuery } from '@/api/platform/device/types';
  import { downloadExcel } from '@/utils/file/download';
  import { IconEnum } from '@/enums/appEnum';
  import DeviceModal from './DeviceModal.vue';
  import { columns, searchFormSchema, DeviceType } from './device.data';
  import { WebsocketResponseCode, useXWebsocketFn } from '@/utils/websocket';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { sendMessageWithCallback } = useXWebsocketFn();

  const [registerTable, { reload, getForm, multipleRemove, getSelectRowKeys }] = useTable({
    api: getDeviceList,
    columns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    actionColumn: {
      width: 200,
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
    rowKey: 'id',
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
    await removeDevice(record.id);
    reload();
  }

  // 打印测试
  function handlePrintTest(record: Recordable) {
    const { withServer, devPortAddr } = record;
    sendMessageWithCallback(
      `${withServer}/printer/print`,
      {
        printerName: devPortAddr,
        epc: '1234',
        printData: JSON.stringify({
          command: '_thermal_zpl_print_',
          printdirectly: 'true',
          print: [
            {
              func: 'zpl_set_label_coordinate_orgin',
              x: 10,
              y: 0,
            },
            {
              func: 'zpl_set_field_pos',
              x: 30,
              y: 0,
            },
            {
              func: 'zpl_text_settings',
              mode: 1,
              w: 40,
              h: 40,
              name: 'L',
            },
            {
              func: 'zpl_add_field_data',
              text: '组合打印功能',
              auto_fex: 1,
            },
            {
              func: 'zpl_add_field_separator',
            },
          ],
        }),
      },
      (data) => {
        const res = JSON.parse(data);
        if (res.code === WebsocketResponseCode.Success) {
          createMessage.success('操作成功');
        } else {
          createMessage.error(res.msg);
        }
      },
    );
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
          v-auth="'platform:device:add'"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          :preIcon="IconEnum.DELETE"
          danger
          @click="multipleRemove(removeDevice)"
          :disabled="getSelectRowKeys().length <= 0"
          v-auth="'platform:device:remove'"
        >
          删除
        </a-button>
        <a-button
          :preIcon="IconEnum.EXPORT"
          color="warning"
          @click="
            downloadExcel(
              () => exportDevice(getForm().getFieldsValue() as DeviceQuery),
              `device_${new Date().getTime()}.xlsx`,
            )
          "
          v-auth="'platform:device:export'"
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
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                label: '删除',
                auth: 'platform:device:remove',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
            :drop-down-actions="
              record.devType === DeviceType.Printer
                ? [
                    {
                      label: '打印测试',
                      icon: 'ant-design:printer-outlined',
                      onClick: handlePrintTest.bind(null, record),
                    },
                  ]
                : []
            "
          />
        </template>
      </template>
    </BasicTable>

    <!--  -->
    <DeviceModal @register="registerModal" @success="reload" />
  </div>
</template>
