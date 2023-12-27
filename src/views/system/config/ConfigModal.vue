<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import BasicForm from '@/components/Form/src/BasicForm.vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema } from './config.data';
  import { ref, computed, unref } from 'vue';
  import { createConfig, getConfigById, updateConfig } from '@/api/system/config';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const { configId } = data.record;
      const config = await getConfigById(configId);
      setFieldsValue({
        ...config,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增参数' : '修改参数'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateConfig(values);
      } else {
        await createConfig(values);
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
