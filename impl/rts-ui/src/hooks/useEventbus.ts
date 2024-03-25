import { onUnmounted } from 'vue';
import mitt from 'mitt';

const emitter: mitt.Emitter = mitt();

// Custom trigger
const customEmit = (eventName) => {
  emitter.emit(eventName);
};

// custom receiver
const customOn = (eventName, callback) => {
  emitter.on(eventName, () => callback());
};

// Notification to refresh table data
const toRefreshTable = () => {
  emitter.emit('reload');
};

// Refresh table data
const reload = (callback) => {
  emitter.on('reload', () => callback());
};

// Notification to refresh tree structure data
const toRefreshTree = () => {
  emitter.emit('refreshTree');
};

// Refresh tree data
const refreshTree = (callback) => {
  emitter.on('refreshTree', () => callback());
};

export const useEventbus = () => {
  onUnmounted(() => {
    emitter.all.clear();
  });
  return {
    customEmit,
    customOn,
    toRefreshTable,
    reload,
    toRefreshTree,
    refreshTree,
  };
};
