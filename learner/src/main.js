import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.js'
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/nprogress/nprogress.css'

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia();
pinia.use(createPersistedState({}));

createApp(App)
    .use(vue3GoogleLogin, {
        clientId: '823786361698-6l1e38096eqhs3ig9gn7rc71uem2b0cb.apps.googleusercontent.com'
    })
    .use(LoadingPlugin)
    .use(router)
    .use(pinia)

    .mount('#app');

    
