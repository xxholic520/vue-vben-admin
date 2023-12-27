<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema } from './devServer.data';
  import { ref, unref, computed } from 'vue';
  import { getDevServerById, createDevServer, updateDevServer } from '@/api/platform/devServer';

  const emit = defineEmits(['register', 'success']);

  const isUpdate = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    model: {
      id: undefined,
      serverName: undefined,
      serverAddr: undefined,
      serverPort: undefined,
      memo: undefined,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;

    if (unref(isUpdate)) {
      const { id } = data.record;
      const record = await getDevServerById(id);
      setFieldsValue({ ...record });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增设备服务' : '修改设备服务'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateDevServer(values);
      } else {
        await createDevServer(values);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
