<script setup lang="ts">
  import { propTypes } from '@/utils/propTypes';
  import { useVModel } from '@vueuse/core';
  import { ref, nextTick } from 'vue';
  import { InputSearch, Button } from 'ant-design-vue';
  import { WebsocketResponseCode, useXWebsocketFn } from '@/utils/websocket';
  import { DeviceType } from '../device.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import BasicForm from '@/components/Form/src/BasicForm.vue';
  import { useModal } from '@/components/Modal';
  import { FormSchema, useForm } from '@/components/Form';

  defineOptions({ name: 'DeviceEnum' });

  const props = defineProps({
    value: propTypes.string,
    values: propTypes.object.def({}),
  });

  const { sendMessageWithCallback } = useXWebsocketFn();
  const { createMessage } = useMessage();
  const loading = ref(false);

  const sValue = useVModel(props, 'value');

  const schemas: FormSchema[] = [
    {
      label: '设备',
      field: 'deviceName',
      component: 'Select',
    },
  ];

  const [registerModal, { openModal, closeModal }] = useModal();

  const [registerForm, { updateSchema, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: schemas,
    showActionButtonGroup: false,
  });

  function handleClick() {
    const { devType, withServer, devPortType } = props.values;

    let topic = '';
    switch (devType) {
      case DeviceType.Printer:
        topic = `${withServer}/printer/enum`;
        break;
      default:
        break;
    }

    if (topic) {
      loading.value = true;
      sendMessageWithCallback(topic, { enumType: devPortType }, (data) => {
        const res = JSON.parse(data);
        if (res.code === WebsocketResponseCode.Success) {
          const { names = [] } = res.data || {};

          openModal(true);

          nextTick(() => {
            updateSchema({
              field: 'deviceName',
              componentProps: {
                options: names.map((v) => ({ label: v, value: v })),
              },
            });
          });
        } else {
          createMessage.error(res.msg);
        }
        loading.value = false;
      });
    }
  }

  async function handleOk() {
    try {
      const data = await validate();
      sValue.value = data.deviceName;
      closeModal();
    } catch (error) {
      //
    }
  }
</script>

<template>
  <div>
    <InputSearch v-model:value="sValue" placeholder="请输入设备地址" autocomplete="off">
      <template #enterButton>
        <Button :loading="loading" @click="handleClick">枚举</Button>
      </template>
    </InputSearch>

    <BasicModal
      @register="registerModal"
      :height="60"
      :minHeight="60"
      :canFullscreen="false"
      title="选择设备"
      @ok="handleOk"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
