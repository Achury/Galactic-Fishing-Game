import { ref, onMounted, onUnmounted } from 'vue';

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);
  const showOfflineAlert = ref(false);

  const updateNetworkStatus = () => {
    isOnline.value = navigator.onLine;
    // Only show alert after initial load and when going offline
    if (!isOnline.value) {
      showOfflineAlert.value = true;
    } else {
      // Small delay to prevent flickering on brief disconnections
      setTimeout(() => {
        showOfflineAlert.value = false;
      }, 3000);
    }
  };

  onMounted(() => {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    // Initial check after components are mounted
    setTimeout(updateNetworkStatus, 1000);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  return { isOnline, showOfflineAlert };
}
