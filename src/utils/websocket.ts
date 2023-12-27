import { UseWebSocketReturn, useWebSocket } from '@vueuse/core';
import { computed, unref, watch } from 'vue';
import { useUserStoreWithOut } from '@/store/modules/user';
import { useMessage } from '@/hooks/web/useMessage';

const { notification } = useMessage();

const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
let websocket: Nullable<UseWebSocketReturn<any>> = null;

class EventMap {
  deps = new Map();
  depend(eventType, callback) {
    this.deps.set(eventType, callback);
  }
  notify(eventType, event) {
    if (this.deps.has(eventType)) {
      this.deps.get(eventType)(event);
    }
  }
}

const _dep = new EventMap();

export const useXWebsocket = () => {
  const userStore = useUserStoreWithOut();

  const isToken = computed(() => !!userStore.getToken);

  function getUrl() {
    const clientid = import.meta.env.VITE_GLOB_APP_CLIENT_ID;
    const api = import.meta.env.VITE_GLOB_API_URL;
    if (userStore.getToken) {
      return `${protocol}${window.location.host}${api}/resource/websocket?Authorization=Bearer ${userStore.getToken}&clientid=${clientid}`;
    }
    return `${protocol}${window.location.host}${api}/resource/websocket`;
  }

  if (!websocket) {
    websocket = useWebSocket(getUrl, {
      autoReconnect: true,
      heartbeat: {
        message: JSON.stringify({ type: 'ping' }),
        interval: 10000,
      },
      immediate: false,
      onMessage(ws, e) {
        if (e.data.indexOf('cmd') > 0) {
          const { cmd } = JSON.parse(e.data);
          _dep.notify(cmd, e.data);
        } else {
          notification.success({
            message: '消息',
            description: e.data,
            duration: 3,
          });
        }
      },
    });
  }

  watch(
    isToken,
    () => {
      if (unref(isToken)) {
        websocket?.open?.();
      } else {
        websocket?.close?.();
      }
    },
    { immediate: true },
  );
};

export const useXWebsocketFn = () => {
  const getIsOpen = computed(() => unref(websocket?.status) === 'OPEN');

  const sendMessageWithCallback = (data: any, callback: Fn) => {
    const { cmd } = data;
    _dep.depend(cmd, callback);
    websocket?.send?.(JSON.stringify(data));
  };

  return {
    getIsOpen,
    sendMessageWithCallback,
  };
};
