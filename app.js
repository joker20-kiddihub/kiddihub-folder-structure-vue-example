import Vue from 'vue'
window.Vue = Vue

import Clipboard from 'v-clipboard';
import { $auth } from "./Services/Auth.js";
import { router } from "./router.js";
import { store } from "./store.js";

import vuetify from './Plugins/vuetify.js';

import App from "./App.vue";

Vue.use(Clipboard);
Vue.prototype.$eventBus = new Vue();

$auth.created(function () {
    Vue.prototype.$auth = $auth;
    const app = new Vue({el: '#app', vuetify, router, store, render: h => h(App)});
});
