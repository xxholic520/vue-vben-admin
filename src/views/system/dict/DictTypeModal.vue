<script setup lang="ts">
  import BasicForm from '@/components/Form/src/BasicForm.vue';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { typeFormSchema } from './dict.data';
  import { ref, unref, computed } from 'vue';
  import { useModalInner } from '@/components/Modal';
  import { createDictType, getDictTypeById, updateDictType } from '@/api/system/dict/type';
  import { useForm } from '@/components/Form';

  defineOptions({ name: 'DictTypeModal' });

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: typeFormSchema,
    showActionButtonGroup: false,
  });

  const [registerTable, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const { dictId } = data.record;
      const dictType = await getDictTypeById(dictId);
      setFieldsValue({
        ...dictType,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典类型' : '修改字典类型'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateDictType(values);
      } else {
        await createDictType(values);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @register="registerTable" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
