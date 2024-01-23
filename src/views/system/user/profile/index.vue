<script setup lang="ts">
  import { computed } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useUserStore } from '@/store/modules/user';
  import headerImg from '@/assets/images/header.jpg';

  defineOptions({ name: 'UserProfile' });

  const userStore = useUserStore();
  const getUserInfo = computed(() => userStore.getUserInfo);

  const { prefixCls } = useDesign('account-center');
</script>

<template>
  <div :class="prefixCls">
    <!--  -->
    <div>还没开发</div>
    <div>{{ getUserInfo }}</div>
    <div>{{ getUserInfo.avatar || headerImg }}</div>
  </div>
</template>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-account-center';

  .@{prefix-cls} {
    &-col:not(:last-child) {
      padding: 0 10px;

      &:not(:last-child) {
        border-right: 1px dashed rgb(206 206 206 / 50%);
      }
    }

    &-top {
      margin: 16px 16px 12px;
      padding: 10px;
      border-radius: 3px;
      background-color: @component-background;
    }

    &-bottom {
      margin: 0 16px 16px;
      padding: 10px;
      border-radius: 3px;
      background-color: @component-background;
    }
  }
</style>
