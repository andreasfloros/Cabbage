const CryptoJS = require("crypto-js");
const fs = require("fs");

const auth = '12D4500890k2+456';

module.exports = (key, filePath) => {
    const dataFile = fs.readFileSync(filePath);
    const dataBase64 = dataFile.toString('base64');
    var result = null;

    if (dataBase64.slice(0, auth.length) === auth) {
        try {
            result = CryptoJS.AES.decrypt(dataBase64.slice(auth.length), key, {mode: CryptoJS.mode.OFB}).toString(CryptoJS.enc.Utf8);
        }
        catch (e) {
            return false;
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