const { ipcRenderer } = require('electron')

ipcRenderer.on('ready', (_, args) => {
    if (args.length > 0) {
        document.getElementById('key-entry').placeholder = args
        document.getElementById('key-entry').focus()
    }
    else {
        ipcRenderer.send('close-app')
    }
})

document.addEventListener('keydown', (e) => {if (e.keyCode == 27) {ipcRenderer.send('close-app')}})

document.getElementById('close-btn').addEventListener('click', () => {ipcRenderer.send('close-app')})

document.getElementById('key-entry').addEventListener('keypress', (e) => {if (e.keyCode == 13) {}})