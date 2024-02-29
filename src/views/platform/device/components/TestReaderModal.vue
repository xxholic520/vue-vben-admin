<script setup lang="ts">
  import { promiseTimeout, useIntervalFn } from '@vueuse/core';
  import { cloneDeep } from 'lodash-es';
  import { ref, unref, reactive } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { useModalInner } from '@/components/Modal';
  import { useTable } from '@/components/Table';
  import { useXWebsocket } from '@/utils/websocket';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import BasicTable from '@/components/Table/src/BasicTable.vue';

  defineOptions({ name: 'TestReaderModal' });

  type AlertType = 'error' | 'success' | 'warning' | 'info';

  const loopTimeout = 500;
  const isRunning = ref(false);
  const loading = ref(false);
  const currentData = ref();
  const showAlertMsg = reactive<{
    visible: boolean;
    msg?: string;
    type?: AlertType;
  }>({
    visible: false,
    msg: '',
    type: 'error',
  });
  const { asyncSendMessage } = useXWebsocket();

  const [registerModal] = useModalInner((data) => {
    isRunning.value = false;
    setTableData([]);
    const { record } = data;
    currentData.value = record;
  });

  const [
    registerTable,
    { getDataSource, insertTableDataRecord, updateTableDataRecord, setTableData },
  ] = useTable({
    columns: [
      { title: 'epc', dataIndex: 'epc' },
      { title: '天线', dataIndex: 'antId' },
      { title: 'RSSI', dataIndex: 'rssi' },
      { title: '读取次数', dataIndex: 'readCount' },
    ],
    showIndexColumn: true,
    rowKey: 'epc',
    bordered: true,
    pagination: false,
    maxHeight: 320,
  });

  const { pause, resume } = useIntervalFn(loop, loopTimeout, { immediate: false });

  function handleOpenChange(vis: boolean) {
    if (!vis && unref(isRunning)) {
      // 停止
      stopReader();
    }
  }

  function handleReader() {
    if (unref(isRunning)) {
      stopReader();
    } else {
      startReader();
    }
  }

  function startReader() {
    isRunning.value = true;
    loading.value = true;
    const { id: deviceId, devPortAddr: url } = unref(currentData);
    asyncSendMessage(`${deviceId}/reader/start`, { url })
      .then(() => {
        setTableData([]);
        resume();
        alertMsg(true, 'success', '连接成功');
      })
      .catch((err: any) => {
        isRunning.value = false;
        alertMsg(true, 'error', err.message);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function stopReader() {
    isRunning.value = false;
    loading.value = true;
    const { id: deviceId, devPortAddr: url } = unref(currentData);
    asyncSendMessage(`${deviceId}/reader/stop`, { url })
      .then(() => {
        pause();
      })
      .finally(() => {
        loading.value = false;
      });
    alertMsg(false);
  }

  function loop() {
    const { id: deviceId, devPortAddr: url } = unref(currentData);
    promiseTimeout(50).then(() => {
      asyncSendMessage(`${deviceId}/reader/tags`, { url }).then((res: any) => {
        const { tags = [] } = res;
        for (let i = 0; i < tags.length; i++) {
          const originData = cloneDeep(unref(getDataSource()));
          const r = tags[i];
          const find = originData.find((item) => r.epc === item.epc);
          if (find) {
            updateTableDataRecord(r.epc, { ...r, readCount: find.readCount + r.readCount });
          } else {
            insertTableDataRecord(r);
          }
        }
      });
    });
  }

  function alertMsg(visible: boolean, type?: AlertType, msg?: string) {
    showAlertMsg.visible = visible;
    showAlertMsg.msg = msg;
    showAlertMsg.type = type;
  }
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="读写器测试"
    :width="820"
    :footer="null"
    @open-change="handleOpenChange"
  >
    <!--  -->
    <Alert
      v-if="showAlertMsg.visible"
      :type="showAlertMsg.type"
      banner
      closable
      :message="showAlertMsg.msg"
      :after-close="() => (showAlertMsg.visible = false)"
    />

    <BasicTable @register="registerTable">
      <template #toolbar>
        <div>
          <a-button type="primary" :loading="loading" @click="handleReader">
            {{ `${isRunning ? '停止' : '开始'}` }}
          </a-button>
        </div>
      </template>
    </BasicTable>
  </BasicModal>
</template>
