import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";
import Vue from 'vue';
import VueFullPage from "vue-fullpage.js";
import "@/assets/code-highlight.css"
Vue.use(VueFullPage);
export default function(Vue, { head, isClient }) {
    if (head) {
        const { default: VueFullPage } = require('vue-fullpage.js')
        Vue.use(VueFullPage)
    }
    if (isClient) {
        Vue.use(VueFullPage);
        require("fullpage.js/dist/fullpage.min.css");
    }
    Vue.component("Layout", DefaultLayout);
    head.bodyAttrs = {
        class: settings.dark_mode ? "dark" : ""
    };
}