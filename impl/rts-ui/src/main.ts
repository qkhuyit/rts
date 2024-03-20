import './polyfill';
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupIcons } from './components/basic/icon';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
import { setupAntd, setupAssets, setupGlobalMethods } from '@/plugins';

const app = createApp(App);

function setupPlugins() {
  // installation icon
  setupIcons();
  // Register globally commonly used ant-design-vue components
  setupAntd(app);
  // Introduce static resources
  setupAssets();
  // Register global methods, such as: app.config.globalProperties.$message = message
  setupGlobalMethods(app);
}

async function setupApp() {
  // Separate chunks can be generated through dynamic import, and combined with global replacement variables, on-demand loading can be achieved without affecting the code packaging volume.
  if (import.meta.env.VITE_MOCK_IN_PROD === 'true') {
    const { setupMock } = await import('../mocks/');
    // enable mock
    await setupMock();
  }

  // Mount vuex state management
  setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);
  // Mount route
  await setupRouter(app);

  app.mount('#app');
}

setupPlugins();

setupApp();
