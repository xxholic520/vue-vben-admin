<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema, DevicePortType } from './device.data';
  import { ref, unref, computed } from 'vue';
  import { getDeviceById, createDevice, updateDevice } from '@/api/platform/device';
  import { Input } from 'ant-design-vue';
  import DeviceEnum from './components/DeviceEnum.vue';

  const emit = defineEmits(['register', 'success']);

  const isUpdate = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    model: {
      id: undefined,
      withServer: undefined,
      devName: undefined,
      devType: undefined,
      devPortType: undefined,
      devPortAddr: undefined,
      devPortNo: undefined,
      devState: undefined,
      memo: undefined,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;

    if (unref(isUpdate)) {
      const { id } = data.record;
      const record = await getDeviceById(id);
      setFieldsValue({ ...record });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增设备' : '修改设备'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await updateDevice(values);
      } else {
        await createDevice(values);
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
    <BasicForm @register="registerForm">
      <template #DevPortAddr_CustomSlot="{ values, field, model }">
        <template
          v-if="
            values.withServer &&
            values.devType &&
            values.devPortType &&
            values.devPortType !== DevicePortType.Web
          "
        >
          <DeviceEnum v-model:value="model[field]" :values="values" />
        </template>
        <template v-else>
          <Input v-model:value="model[field]" placeholder="请输入设备地址" autocomplete="off" />
        </template>
      </template>
    </BasicForm>
  </BasicModal>
</template>
