/// <reference types="vite/client" />

import { ElectronAPI } from '@electron-toolkit/preload'

declare global {

  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
