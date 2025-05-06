import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/css/main.css';

const app = createApp(App);
app.use(createPinia());

// Improved Service Worker Registration
if ('serviceWorker' in navigator) {
  const registerSW = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      // Check for updates immediately
      registration.update();

      // Track installation state
      if (registration.installing) {
        registration.installing.addEventListener('statechange', (event) => {});
      }
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  };

  // Register immediately (don't wait for page load)
  if (document.readyState === 'complete') {
    registerSW();
  } else {
    window.addEventListener('load', registerSW);
  }
}

app.mount('#app');
