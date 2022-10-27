const { ipcRenderer } = require('electron');
const { encryptDecrypt } = require('./crypto.js');
const fs = require("fs");

ipcRenderer.on('ready', (_, maybeFilePath) => {
    if (fs.existsSync(maybeFilePath) && fs.lstatSync(maybeFilePath).isFile()) {
        document.getElementById('password-entry').placeholder = maybeFilePath;
        document.getElementById('password-entry').focus();
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

document.getElementById('password-entry').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        try {
            success = encryptDecrypt(document.getElementById('password-entry').value,
                                     document.getElementById('password-entry').placeholder);
        }
        catch (e) {
            success = false; // wrong password, file deleted, file locked
        }
        if (success) {
            ipcRenderer.send('close-app');
        }
        else {
            document.getElementById('password-entry').value = "";
        }
    }
})