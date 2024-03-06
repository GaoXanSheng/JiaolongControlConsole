import {app,BrowserWindow} from 'electron'
import path from 'node:path'
import {wMIOperation, WMIOperation} from "./tools/WMIOperation.ts";
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-icon.ico'),
        autoHideMenuBar: true,
        frame: true, // 设置为 false，去掉窗口的默认边框
        transparent: false, // 设置为 true，使窗口背景透明
        // 设置窗口形状

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration:true
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
        win.webContents.openDevTools({
            mode: "detach"
        })
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
    let FilePath
    if (app.isPackaged) {
        FilePath = path.join(app.getAppPath(), '..\\JiaoLongWMI\\JiaoLongWMI.exe')
    } else {
        FilePath = path.join(app.getAppPath(), '\\JiaoLongWMI\\JiaoLongWMI.exe')
    }
    wMIOperation.init(FilePath)

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)