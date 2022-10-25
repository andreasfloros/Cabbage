const { ipcRenderer } = require('electron');
const encryptDecrypt = require('./crypto.js');
const fs = require("fs");

ipcRenderer.on('ready', (_, maybeFilePath) => {
    if (fs.existsSync(maybeFilePath)) {
        document.getElementById('key-entry').placeholder = maybeFilePath;
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
        successOrDeleted = encryptDecrypt(document.getElementById('key-entry').value,
                                          document.getElementById('key-entry').placeholder);
        if (successOrDeleted) {
            ipcRenderer.send('close-app');
        }
        else {
            document.getElementById('key-entry').value = "";
        }
    }
})