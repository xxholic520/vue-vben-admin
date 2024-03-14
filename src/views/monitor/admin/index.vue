<template>
  <IFrame :src="url" />
</template>

<script setup lang="ts">
  import { IFrame } from '@/components/IFrame';
  import { useGlobSetting } from '@/hooks/setting';
  import { computed } from 'vue';

  defineOptions({ name: 'Admin' });

  const globSetting = useGlobSetting();
  const url = computed<string>(() => {
    const { adminMonitorUrl } = globSetting;
    const defaultUrl = `/admin/applications`;
    if (adminMonitorUrl.startsWith('http')) {
      return adminMonitorUrl;
    }
    return defaultUrl;
  });
</script>

<style scoped></style>
