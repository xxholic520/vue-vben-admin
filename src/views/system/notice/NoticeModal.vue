<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    :width="700"
    @register="registerInnerModal"
    @ok="handleSubmit"
    @cancel="resetFields"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { noticeUpdate, noticeAdd, noticeInfo } from '@/api/system/notice';
  import { modalSchemas } from './notice.data';

  defineOptions({ name: 'NoticeModal' });

  const emit = defineEmits(['register', 'reload']);

  const title = computed<string>(() => {
    return isUpdate.value ? '编辑公告' : '新增公告';
  });

  const isUpdate = ref<boolean>(false);
  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      resetFields();
      const { record, update } = data;
      isUpdate.value = update;
      if (update && record) {
        const ret = await noticeInfo(record.noticeId);
        await setFieldsValue(ret);
      }
    },
  );

  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    layout: 'vertical',
    labelWidth: 80,
    showActionButtonGroup: false,
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate();
      if (unref(isUpdate)) {
        await noticeUpdate(data);
      } else {
        await noticeAdd(data);
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
