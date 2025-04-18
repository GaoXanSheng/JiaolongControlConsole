import { createApp } from 'vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import './assets/magic.min.css'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createPinia } from 'pinia'
import routes from '@renderer/routes'
import 'vue-data-ui/style.css'
import { VueUiRadar } from 'vue-data-ui'

createApp(App)
	.use(createPinia())
	.use(routes)
	.use(ArcoVue)
	.use(ArcoVueIcon)
	.component('VueUiRadar', VueUiRadar)
	.mount('#app')
