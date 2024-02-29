<script setup lang="ts">
  import { ref, unref } from 'vue';
  import { promiseTimeout } from '@vueuse/core';
  import { MODE } from '@/components/CodeEditor';
  import { useModalInner } from '@/components/Modal';
  import { getDeviceById, updateDevice } from '@/api/platform/device';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import CodeEditor from '@/components/CodeEditor/src/CodeEditor.vue';

  defineOptions({ name: 'ConfigModal' });

  const emit = defineEmits(['register', 'success']);

  const modeValue = ref<MODE>(MODE.JSON);
  const value = ref('{}');
  const currentData = ref();

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const { id, config } = data.record;
    config && (value.value = config);
    const record = await getDeviceById(id);
    await promiseTimeout(50);
    currentData.value = { ...record };
    setModalProps({
      width: 1024,
      okText: '保存',
    });
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      await updateDevice({ ...unref(currentData), config: unref(value) });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="配置项" @ok="handleSubmit">
    <CodeEditor v-model:value="value" :mode="modeValue" />
  </BasicModal>
</template>
