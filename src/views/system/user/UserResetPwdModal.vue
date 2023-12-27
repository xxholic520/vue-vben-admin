<template>
  <BasicModal
    v-bind="$attrs"
    :minHeight="100"
    title="修改密码"
    @register="registerInnerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { userResetPassword } from '@/api/system/user';
  import { resetPasswordSchemas } from './user.data';
  import { ResetPwdParam } from '@/api/system/user/types';

  defineOptions({ name: 'UserResetPwdModal' });

  const emit = defineEmits(['register', 'reload']);

  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (userId: string) => {
      resetFields();
      await setFieldsValue({ userId });
    },
  );

  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    labelWidth: 80,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: resetPasswordSchemas,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate<ResetPwdParam>();
      await userResetPassword(data);
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
