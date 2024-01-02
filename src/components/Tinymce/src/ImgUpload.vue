<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      @change="handleChange"
      :action="actionUrl"
      :headers="headers"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      <a-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </a-button>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useGlobSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { getToken } from '@/utils/auth';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'TinymceImageUpload' });

  const { createMessage } = useMessage();

  const props = defineProps({
    fullscreen: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['uploading', 'done', 'error']);

  let uploading = false;

  const { uploadUrl, apiUrl, clientId, urlPrefix } = useGlobSetting();
  const { t } = useI18n();
  const { prefixCls } = useDesign('tinymce-img-upload');

  const actionUrl = `${apiUrl}${urlPrefix || ''}${uploadUrl}`;
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    clientId,
  };

  const getButtonProps = computed(() => {
    const { disabled } = props;
    return {
      disabled,
    };
  });

  function handleChange(info: Record<string, any>) {
    const file = info.file;
    const status = file?.status;
    // const url = file?.response?.url;
    const name = file?.name;

    if (status === 'uploading') {
      if (!uploading) {
        emit('uploading', name);
        uploading = true;
      }
    } else if (status === 'done') {
      const { response } = file;
      const { code, msg = '服务器错误', data } = response;
      if (code === 200) {
        const { url } = data;
        emit('done', name, url);
      } else {
        createMessage.error(msg);
      }
      uploading = false;
    } else if (status === 'error') {
      emit('error');
      uploading = false;
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls} {
    position: absolute;
    z-index: 20;
    top: 4px;
    right: 10px;

    &.fullscreen {
      position: fixed;
      z-index: 10000;
    }
  }
</style>
