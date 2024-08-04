import './assets/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// ArcoVue
import '@arco-design/web-vue/dist/arco.css';
import ArcoVue from '@arco-design/web-vue';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

createApp(App).use(store).use(ArcoVue).use(ArcoVueIcon).mount('#app')
