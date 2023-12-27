<script lang="ts">
  import { computed, defineComponent, h, ref, unref, watchEffect } from 'vue';
  import BasicButton from './BasicButton.vue';
  import { Popconfirm } from 'ant-design-vue';
  import { extendSlots } from '@/utils/helper/tsxHelper';
  import { omit } from 'lodash-es';
  import { useAttrs } from '@vben/hooks';
  import { useI18n } from '@/hooks/web/useI18n';

  const props = {
    /**
     * Whether to enable the drop-down menu
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true,
    },

    times: {
      type: [Number, Boolean],
      default: () => 3,
    },
  };

  export default defineComponent({
    name: 'PopButton',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const { t } = useI18n();
      const attrs = useAttrs();
      const times = ref(props.times);

      // get inherit binding value
      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: unref(times) ? `${t('common.okText')}(${unref(times)})` : t('common.okText'),
            cancelText: t('common.cancelText'),
          },
          {
            ...props,
            ...unref(attrs),
            ...(unref(times)
              ? {
                  onConfirm: async () => {
                    if (typeof times.value === 'number' && --times.value <= 0) {
                      return unref(attrs)
                        ?.onConfirm?.()
                        ?.catch(() => {
                          times.value = props.times;
                        });
                    }
                    return Promise.reject(new Error('popconfirm times limit'));
                  },
                }
              : {}),
          },
        );
      });

      watchEffect(() => {
        if (!unref(attrs).open || !unref(attrs).visible) {
          times.value = props.times;
        }
      });

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon');
        const btnBind = omit(bindValues, 'title') as any;
        if (btnBind.disabled) btnBind.color = '';
        const Button = h(BasicButton, btnBind, extendSlots(slots));

        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }
        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>
