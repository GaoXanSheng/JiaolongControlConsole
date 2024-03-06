import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store.ts";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

createApp(App).use(store).use(PrimeVue).mount('#app').$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({payload: 'removeLoading'}, '*')
    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
        console.log(message)
    })
}).then(() => {
    console.log("INIT")
})
