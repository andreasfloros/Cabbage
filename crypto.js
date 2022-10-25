const CryptoJS = require("crypto-js");
const fs = require("fs");

module.exports = (key, filePath) => {
    const auth = '12D4500890k2+456';
    let dataFile = null;
    try{
        dataFile = fs.readFileSync(filePath);
    }
    catch (e) {
        return true; // file was deleted
    }
    const dataBase64 = dataFile.toString('base64');
    let result = null;

    if (dataBase64.slice(0, auth.length) === auth) {
        try {
            result = CryptoJS.AES.decrypt(dataBase64.slice(auth.length), key, {mode: CryptoJS.mode.OFB}).toString(CryptoJS.enc.Utf8);
        }
        catch (e) {
            return false; // wrong key
        }
        if (result.slice(0, auth.length) !== auth) {
            return false;
        }
        result = result.slice(auth.length);
    }
    else {
        result = auth + CryptoJS.AES.encrypt(auth + dataBase64, key, {mode: CryptoJS.mode.OFB}).toString();
    }
    const buffer = Buffer.from(result, 'base64');
    fs.writeFileSync(filePath, buffer);
    return true;
}