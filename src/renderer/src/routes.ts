import { createRouter, createWebHashHistory } from 'vue-router'

import Main from './components/Main.vue'
import OpenProSettings from './components/OpenProSettings.vue'

const routes = [
	{ path: '/', component: Main },
	{ path: '/OpenProSettings', component: OpenProSettings }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
