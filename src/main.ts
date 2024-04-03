import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import store from "./store.ts";

const Vue = createApp
Vue(App).use(store).mount('#app').$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({payload: 'removeLoading'}, '*')
    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
        console.log(message)
    })
}).then(() => {
    console.log("INIT")
})
window.onload = function () {
    const localStorageData = localStorage.getItem("store")
    if (localStorageData) {
        const data = JSON.parse(localStorageData)
        for (const datum in store.state) {
            store.state[datum] = data[datum] || ""
        }
    }
}

setInterval(() => {
    localStorage.setItem("store", JSON.stringify(store.state))
}, 1000)