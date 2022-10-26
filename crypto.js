const CryptoJS = require("crypto-js");
const fs = require("fs");

module.exports = (password, filePath) => {
    const auth = '12D4500890k2+456';
    const dataFile = fs.readFileSync(filePath);
    const dataBase64 = dataFile.toString('base64');
    let result = null;
    if (dataBase64.slice(0, auth.length) === auth) {
        result = CryptoJS.AES.decrypt(dataBase64.slice(auth.length), password, {mode: CryptoJS.mode.OFB}).toString(CryptoJS.enc.Utf8);
        if (result.slice(0, auth.length) !== auth) {
            return false;
        }
        result = result.slice(auth.length);
    }
    else {
        result = auth + CryptoJS.AES.encrypt(auth + dataBase64, password, {mode: CryptoJS.mode.OFB}).toString();
    }
    const buffer = Buffer.from(result, 'base64');
    fs.writeFileSync(filePath, buffer);
    return true;
}