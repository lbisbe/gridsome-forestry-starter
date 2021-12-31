import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";
import Vue from 'vue';
import VueFullPage from "vue-fullpage.js";
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import vueVimeoPlayer from 'vue-vimeo-player'
Vue.use(vueVimeoPlayer)

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