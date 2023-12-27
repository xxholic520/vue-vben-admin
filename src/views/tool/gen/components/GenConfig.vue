<template>
  <div>
    <BasicTable v-if="props.value" :data-source="rows" @register="registerTable" />
    <Space align="center" class="w-full flex justify-center mt-5" v-if="props.value">
      <a-button :pre-icon="IconEnum.PREV" @click="handleJumpto(0)">上一步</a-button>
      <a-button :post-icon="IconEnum.NEXT" type="primary" @click="handleJumpto(2)">完成</a-button>
    </Space>
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { Info } from '@/api/tool/gen/data';
  import { Space } from 'ant-design-vue';
  import { reactive, computed } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { IconEnum } from '@/enums/appEnum';
  import { columns } from './genConfig.data';

  const props = defineProps<{ value: Info }>();
  const rows = computed(() => props.value.columns.map((row) => ({ ...row, editable: true })));
  const emit = defineEmits<{ (e: 'jumpto', value: number, data?: Info): void }>();

  const [registerTable, { getDataSource }] = useTable({
    showIndexColumn: true,
    showTableSetting: false,
    bordered: true,
    pagination: false,
    rowKey: 'columnId',
    columns,
    canResize: true,
    inset: true,
    // isCanResizeParent: true,
    resizeHeightOffset: 50,
  });

  function handleJumpto(id: number) {
    const data = reactive(cloneDeep(props.value));
    data.columns = getDataSource();
    emit('jumpto', id, data);
  }
</script>

<style lang="less" scoped></style>
