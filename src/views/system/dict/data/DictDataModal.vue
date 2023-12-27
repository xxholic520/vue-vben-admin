<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import BasicForm from '@/components/Form/src/BasicForm.vue';
  import { useModalInner } from '@/components/Modal';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { ref, computed, unref } from 'vue';
  import { getDictDataByCode, updateDictData, createDictData } from '@/api/system/dict/data';
  import { formSchema } from './data.data';
  import { SysDictDataVo } from '@/api/system/dict/data/types';

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
    isUpdate.value = data.isUpdate;
    if (unref(isUpdate)) {
      const { dictCode } = data.record;
      const dictData = await getDictDataByCode(dictCode);
      setFieldsValue({ ...dictData });
    } else {
      setFieldsValue({ ...data.record });
    }
  });

  const getTitle = computed(() => (unref(isUpdate) ? '修改字典数据' : '新增字典数据'));

  async function handleSubmit() {
    try {
      const values = await validate<SysDictDataVo>();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateDictData(values);
      } else {
        await createDictData(values);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal :title="getTitle" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
