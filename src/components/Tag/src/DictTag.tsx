import { DictDataOption } from '@/utils/helper/dictHelper';
import { propTypes } from '@/utils/propTypes';
import { computed, defineComponent } from 'vue';
import { Tag } from 'ant-design-vue';

export default defineComponent({
  name: 'DictTag',
  components: { Tag },
  props: {
    options: Array as PropType<DictDataOption[]>,
    value: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.array]),
    separator: propTypes.string.def(','),
  },
  setup(props) {
    const tagColorMap = {
      default: '',
      primary: 'blue',
      success: 'green',
      info: 'cyan',
      warning: 'orange',
      danger: 'red',
    };
    const values = computed(() => {
      if (props.value === '' || props.value === null || typeof props.value === 'undefined')
        return [];
      return Array.isArray(props.value)
        ? props.value.map((item) => '' + item)
        : String(props.value).split(props.separator);
    });
    // const unmatch = computed(() => {
    //   if (
    //     props.options?.length === 0 ||
    //     props.value === '' ||
    //     props.value === null ||
    //     typeof props.value === 'undefined'
    //   )
    //     return false;
    //   values.value.forEach((item) => {
    //     if (props.options && !props.options.some((v) => v.value === item)) {
    //       return true; // 如果有未匹配项，将标志设置为true
    //     }
    //   });
    //   return false;
    // });
    return () => {
      const { options } = props;
      return options?.map((option) => {
        if (values.value.includes(option.value)) {
          return (
            <Tag key={option.value + ' '} color={tagColorMap[option.tagClass]}>
              {option.label + ' '}
            </Tag>
          );
        }
      });
    };
  },
});
