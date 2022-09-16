const { ipcRenderer } = require('electron');
const encryptDecrypt = require('./crypto.js');

ipcRenderer.on('ready', (_, args) => {
    if (args.length > 0) {
        filePath = args;
        document.getElementById('key-entry').placeholder = filePath;
        document.getElementById('key-entry').focus();
    }
    else {
        ipcRenderer.send('close-app');
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" ) {
        ipcRenderer.send('close-app');
    }
})

document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-app');
})

document.getElementById('key-entry').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        success = encryptDecrypt(document.getElementById('key-entry').value, document.getElementById('key-entry').placeholder);
        if (success) {
            ipcRenderer.send('close-app');
        }
        else {
            document.getElementById('key-entry').value = '';
        }
    }
})