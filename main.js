const { app, ipcMain, BrowserWindow } = require('electron');

function createWindow () {

    const win = new BrowserWindow({
        width: 320,
        height: 16,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
            spellcheck: false
        }
    });
  
    win.loadFile('main.html');
    win.once('ready-to-show', win.show);

    win.webContents.once('dom-ready', () => {
        win.webContents.send('ready', process.argv[1]);
    })

    ipcMain.on('close-app', () => {
        win.close();
    })
};

app.whenReady().then(() => {
    createWindow();
})