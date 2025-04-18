import { createRouter, createWebHashHistory } from 'vue-router'

import Main from './page/Main.vue'
import OpenProSettings from './page/OpenProSettings.vue'

const routes = [
	{ path: '/', component: Main },
	{ path: '/OpenProSettings', component: OpenProSettings }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
