const CryptoJS = require("crypto-js");
const fs = require("fs");

const iv = '9De0DgMTCDFGNokdEEial';

module.exports = (key, filePath) => {
    const dataFile = fs.readFileSync(filePath);
    const dataBase64 = dataFile.toString('base64');
    var result = null;

    if (dataBase64.slice(0, iv.length) === iv) {
        try {
            result = CryptoJS.AES.decrypt(dataBase64.slice(iv.length), key, {iv: iv, mode: CryptoJS.mode.OFB}).toString(CryptoJS.enc.Utf8);
        }
        catch (e) {
            return false;
        }
        if (result.slice(0, iv.length) !== iv) {
            return false;
        }
        result = result.slice(iv.length);
    }
    else {
        result = iv + CryptoJS.AES.encrypt(iv + dataBase64, key, {iv: iv, mode: CryptoJS.mode.OFB}).toString();
    }
    const buffer = Buffer.from(result, 'base64');
    fs.writeFileSync(filePath, buffer);
    return true;
}