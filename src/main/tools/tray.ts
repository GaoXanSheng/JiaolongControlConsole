import { app, BrowserWindow, Menu, Tray } from 'electron'

export default function(win: BrowserWindow, icon: string) {
  let isQuitting = false
  const tray = new Tray(icon) // 请确保这里有一个图标文件
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示界面',
      click: function() {
        win.show()
      }
    },
    {
      label: '退出',
      click: function() {
        isQuitting = true
        app.quit()
      }
    }
  ])

  tray.setToolTip('JiaolongControlConsole')
  tray.on('click', () => {
    win.show()
  })
  tray.setContextMenu(contextMenu)
  // 最小化到托盘
  win.on('close', function(event) {
    if (!isQuitting) {
      event.preventDefault()
      win.hide()
    }
  })
}
