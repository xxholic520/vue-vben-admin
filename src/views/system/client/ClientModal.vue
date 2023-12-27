<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    :width="600"
    @register="registerInnerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { createClient, updateClient, getClientById } from '@/api/system/client';
  import { modalSchemas } from './client.data';

  defineOptions({ name: 'ClientModal' });

  const emit = defineEmits(['register', 'reload']);

  const isUpdate = ref<boolean>(false);

  const title = computed<string>(() => {
    return isUpdate.value ? '编辑客户端' : '新增客户端';
  });

  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      resetFields();

      const { record, update } = data;
      isUpdate.value = update;

      updateSchema([
        { field: 'clientId', show: update },
        { field: 'clientKey', componentProps: { disabled: update } },
        { field: 'clientSecret', componentProps: { disabled: update } },
      ]);

      if (update && record) {
        const ret = await getClientById(record.id);
        await setFieldsValue(ret);
      }
    },
  );

  const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
    layout: 'vertical',
    labelWidth: 180,
    showActionButtonGroup: false,
    rowProps: { gutter: 16 },
    baseColProps: { span: 24 },
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate();
      data.grantType = data.grantTypeList.join(',');
      if (unref(isUpdate)) {
        await updateClient(data);
      } else {
        await createClient(data);
      }
      closeModal();
      emit('reload');
    } catch (e) {
      //
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style scoped></style>
