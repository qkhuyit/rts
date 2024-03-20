import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Is the user network available?
 * */
export function useOnline() {
  const online = ref(true);

  const showStatus = (val) => {
    online.value = typeof val == 'boolean' ? val : val.target.online;
  };

  // After the page loads, set the correct network status
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // Start monitoring changes in network status
    window.addEventListener('online', showStatus);

    window.addEventListener('offline', showStatus);
  });
  onUnmounted(() => {
    // Remove monitoring network status changes
    window.removeEventListener('online', showStatus);

    window.removeEventListener('offline', showStatus);
  });

  return { online };
}
