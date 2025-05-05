import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/css/main.css';

const app = createApp(App);
app.use(createPinia());

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

app.mount('#app');
