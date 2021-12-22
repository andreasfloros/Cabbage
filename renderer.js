const { ipcRenderer } = require('electron')

ipcRenderer.on('argv', (_, args) => {
    if (args.length > 0) {
        document.getElementById('key-entry').placeholder = args
    }
    else {
        ipcRenderer.send('close-app')
    }
})

document.getElementById('close-btn').addEventListener('click', () => {ipcRenderer.send('close-app')})

document.getElementById('key-entry').addEventListener('keypress', (e) => {if (e.keyCode == 13) {}})