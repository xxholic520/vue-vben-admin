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
  import { ossConfigInfo, ossConfigAdd, ossConfigUpdate } from '@/api/system/oss/config';
  import { modalSchemas } from './oss.config.data';

  defineOptions({ name: 'OssConfigModal' });

  const emit = defineEmits(['register', 'reload']);

  const isUpdate = ref<boolean>(false);

  const title = computed<string>(() => {
    return isUpdate.value ? '编辑OSS配置' : '新增OSS配置';
  });

  const [registerInnerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      resetFields();
      const { record, update } = data;
      isUpdate.value = update;
      if (update && record) {
        const ret = await ossConfigInfo(record.ossConfigId);
        await setFieldsValue(ret);
      }
    },
  );

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const data = await validate();
      if (unref(isUpdate)) {
        await ossConfigUpdate(data);
      } else {
        await ossConfigAdd(data);
      }
      closeModal();
      emit('reload', closeModal);
    } catch (e) {
      //
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style scoped></style>
./oss.config.data
