<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema } from './dept.data';
  import { ref, unref, computed } from 'vue';
  import { getDeptById, createDept, updateDept } from '@/api/system/dept';

  const emit = defineEmits(['register', 'success']);

  const isUpdate = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    layout: 'vertical',
    labelWidth: 120,
    rowProps: { gutter: 16 },
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    model: {
      deptId: undefined,
      parentId: undefined,
      ancestors: undefined,
      deptName: undefined,
      orderNum: undefined,
      leader: undefined,
      phone: undefined,
      email: undefined,
      status: undefined,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;
    const { deptId, parentId } = data.record;
    if (unref(isUpdate)) {
      const record = await getDeptById(deptId);
      await setFieldsValue({ ...record });
      await updateSchema({ field: 'parentId', ifShow: !!parentId });
    } else {
      await setFieldsValue({ parentId: deptId });
      await updateSchema({ field: 'parentId', ifShow: true });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '修改部门'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateDept(values);
      } else {
        await createDept(values);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :width="600"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
