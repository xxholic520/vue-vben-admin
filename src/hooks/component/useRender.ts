import { DictTag } from '@/components/Tag';
import { formatToDate, formatToDateTime } from '@/utils/dateUtil';
import { DictDataOption } from '@/utils/helper/dictHelper';
import { VNode, h } from 'vue';
import { Image as AImage, Switch, Tag, Tooltip } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { TooltipPlacement } from 'ant-design-vue/lib/tooltip';
import { promiseTimeout } from '@vueuse/core';

// import { useMessage } from '../web/useMessage';

// const { createConfirm } = useMessage();

function renderTag(text: string, color?: string) {
  return h(Tag, { color }, () => text);
}

function renderTags(tags: string[], wrap = false) {
  const tagList: VNode[] = [];
  tags.forEach((item) => {
    tagList.push(renderTag(item));
    if (wrap) {
      tagList.push(h('br'));
    }
  });
  return h('span', tagList);
}

function renderDictTag(value: string, options: DictDataOption[]) {
  return h(DictTag, { options, value });
}

function renderDate(date: string) {
  return formatToDate(date);
}

function renderDateTime(date: string) {
  return formatToDateTime(date);
}

function renderImage(props: {
  src: string;
  fallback?: string;
  alt?: string;
  width: string | number;
  height: string | number;
  placeholder?: boolean;
  preview?: boolean;
}) {
  return h(AImage, props);
}

function renderSwitch(record: Recordable, api: (...data: any) => Promise<any>) {
  if (!Reflect.has(record, 'pendingStatus')) {
    record.pendingStatus = false;
  }
  return h(Switch, {
    checked: record.status,
    checkedChildren: '启用',
    unCheckedChildren: '停用',
    checkedValue: '0',
    unCheckedValue: '1',
    loading: record.pendingStatus,
    onChange: async (newStatus, e) => {
      e.stopPropagation();
      const lastStatus = record.status;
      record.pendingStatus = true;
      record.status = newStatus;
      try {
        await promiseTimeout(1000);
        await api(record);
      } catch (error) {
        record.status = lastStatus;
      } finally {
        record.pendingStatus = false;
      }
    },
  });
}

function renderIcon(icon: string) {
  return h(Icon, { icon });
}

function renderIconSpan(icon: string, value: string, marginLeft = '2px') {
  return h(
    'span',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    [renderIcon(icon), ' ', h('span', { style: { marginLeft } }, value)],
  );
}

function renderTooltip(value: string, placement: TooltipPlacement = 'top') {
  return h(Tooltip, { placement, title: value }, () => value);
}

export function useRender() {
  return {
    renderDictTag,
    renderDate,
    renderDateTime,
    renderImage,
    renderSwitch,
    renderTag,
    renderTags,
    renderIconSpan,
    renderTooltip,
  };
}
