<script setup lang="ts">
  import { useDescription } from '@/components/Description';
  import Description from '@/components/Description/src/Description.vue';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { descriptionSchma } from './operlog.data';
  import { useModalInner } from '@/components/Modal';

  const [registerDescription, { setDescProps }] = useDescription({
    column: 2,
    schema: descriptionSchma,
  });

  const [register] = useModalInner((data) => {
    setDescProps({ data });
  });
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    destroy-on-close
    title="操作日志详细"
    :footer="null"
    :width="1200"
    @register="register"
  >
    <div>
      <Description @register="registerDescription" />
    </div>
  </BasicModal>
</template>
