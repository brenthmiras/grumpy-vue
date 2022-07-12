import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue-3';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';

createApp(App).use(router).use(BootstrapVue).mount('#app');
