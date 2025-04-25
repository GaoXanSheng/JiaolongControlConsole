import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '@renderer/pages/Main.vue'
import OpenProSettings from '@renderer/pages/OpenProSettings.vue'

const routes = [
	{ path: '/', component: Main },
	{ path: '/OpenProSettings', component: OpenProSettings }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
