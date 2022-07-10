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
    if (e.keyCode == 27) {
        ipcRenderer.send('close-app');
    }
})

document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-app');
})

document.getElementById('key-entry').addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        success = encryptDecrypt(document.getElementById('key-entry').value, document.getElementById('key-entry').placeholder);
        if (success) {
            document.getElementById('key-entry').value = '';
            document.getElementById('key-entry').focus();
            ipcRenderer.send('close-app');
        }
    }
})