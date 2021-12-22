const { app, ipcMain, BrowserWindow } = require('electron')

function createWindow () {

    const win = new BrowserWindow({
        width: 320,
        height: 16,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
            spellcheck: false
        }
    })
  
    win.loadFile('main.html')

    win.webContents.once('dom-ready', () => {win.webContents.send('argv', process.argv.slice(1))})

    ipcMain.on('close-app', () => {win.close()})
}

app.whenReady().then(() => {createWindow()})