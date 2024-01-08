<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema } from './para.data';
  import { ref, unref, computed } from 'vue';
  import { getParaById, createPara, updatePara } from '@/api/platform/para';

  const emit = defineEmits(['register', 'success']);

  const isUpdate = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    model: {
      id: undefined,
      paraCode: undefined,
      paraGroup: undefined,
      paraName: undefined,
      paraLevel: undefined,
      paraType: undefined,
      minValue: undefined,
      maxValue: undefined,
      defValue: undefined,
      paraValue: undefined,
      paraOrder: undefined,
      memo: undefined,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;

    if (unref(isUpdate)) {
      const { id } = data.record;
      const record = await getParaById(id);
      setFieldsValue({ ...record });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增参数设置' : '修改参数设置'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updatePara(values);
      } else {
        await createPara(values);
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
