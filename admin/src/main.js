import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.js'
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/nprogress/nprogress.css' 


import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const pinia = createPinia();
pinia.use(createPersistedState({}));

createApp(App)
    .use(LoadingPlugin)
    .use(router)
    .use(pinia)
    .mount('#app');

    