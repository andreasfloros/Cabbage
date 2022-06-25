const CryptoJS = require("crypto-js");
const fs = require("fs");

const iv = '9De0DgMTCDFGNokdEEial';

module.exports = (key, filePath) => {
    const dataFile = fs.readFileSync(filePath);
    const dataBase64 = dataFile.toString('base64');
    var result = null;

    if (dataBase64.slice(0, iv.length) === iv) {
        result = CryptoJS.AES.decrypt(dataBase64.slice(iv.length), key, {iv: iv}).toString(CryptoJS.enc.Utf8);
    }
    else {
        result = iv + CryptoJS.AES.encrypt(dataBase64, key, {iv: iv}).toString();
    }
    const buffer = new Buffer(result, 'base64');
    fs.writeFileSync(filePath, buffer);
}