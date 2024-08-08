import icon from '../../../resources/icon.png?asset'
import tray from '../tools/tray'
import JiaoLongWMI from '../tools/JiaoLongWMI'
import WmiExe from '../../../resources/JiaoLongWMI.exe?asset&asarUnpack'
import { join } from 'path'
import { shell, BrowserWindow } from 'electron'

import { is } from '@electron-toolkit/utils'
import windowHandle from './windowHandle'


export default function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon,
    autoHideMenuBar: true,
    frame: true, // 设置为 false，去掉窗口的默认边框
    transparent: false, // 设置为 true，使窗口背景透明
    // 设置窗口形状
    height: 700,
    width: 1000,
    minHeight: 700,
    minWidth: 1000,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      autoplayPolicy:"no-user-gesture-required"
    }
  })
  tray(mainWindow, icon)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  JiaoLongWMI(WmiExe).then(_r => {
    console.log('Server run')
  })
  //windowHandle
  windowHandle()
}
