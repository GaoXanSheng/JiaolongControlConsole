import {BrowserWindow} from "electron";

export default function (win: BrowserWindow) {
    win.webContents.on('did-finish-load', async () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })
}