import { UseWebSocketReturn, useWebSocket } from '@vueuse/core';
import { computed, unref, watch } from 'vue';
import { useUserStoreWithOut } from '@/store/modules/user';
import { useMessage } from '@/hooks/web/useMessage';

// 返回状态码
export enum WebsocketResponseCode {
  Success = 200,
  Fail = 500,
}

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

export function useXWebsocket() {
  const userStore = useUserStoreWithOut();

  const isToken = computed(() => !!userStore.getToken);

  const initWebsocket = () => {
    function getUrl() {
      const clientid = import.meta.env.VITE_GLOB_APP_CLIENT_ID;
      const api = import.meta.env.VITE_GLOB_API_URL;
      const token = userStore.getToken
        ? `?Authorization=Bearer ${userStore.getToken}&clientid=${clientid}`
        : '';
      return `${protocol}${window.location.host}${api}/resource/websocket${token}`;
    }

    if (!websocket) {
      websocket = useWebSocket(getUrl, {
        autoReconnect: {
          retries: 5,
          delay: 10000,
          onFailed: () => {
            userStore.logout(true);
          },
        },
        heartbeat: {
          message: JSON.stringify({ type: 'ping' }),
          interval: 10000,
          pongTimeout: 1000,
        },
        immediate: false,
        onMessage(ws, e) {
          if (e.data.indexOf('topic') > 0) {
            const { topic } = JSON.parse(e.data);
            _dep.notify(topic, e.data);
          } else if (e.data.indexOf('ping') > 0) {
            return;
          } else {
            notification.success({
              message: '消息',
              description: e.data,
              duration: 3,
            });
          }
        },
      });
    } else {
      throw new Error('websocket connected');
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

  const getIsOpen = computed(() => unref(websocket?.status) === 'OPEN');

  const sendMessageWithCallback = (topic: string, data: any, callback: Fn) => {
    _dep.depend(topic, callback);
    websocket?.send?.(JSON.stringify({ topic, data }));
  };

  const asyncSendMessage = (topic: string, data: any) => {
    return new Promise((resolve, reject) => {
      sendMessageWithCallback(topic, data, (res) => {
        res = JSON.parse(res);
        if (res.code === WebsocketResponseCode.Success) {
          resolve(res.data);
        } else {
          reject(new Error(res.msg));
        }
      });
    });
  };

  return {
    initWebsocket,
    getIsOpen,
    sendMessageWithCallback,
    asyncSendMessage,
  };
}
