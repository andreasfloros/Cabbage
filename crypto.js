const CryptoJS = require("crypto-js");
const fs = require("fs");

const generateCfg = (password, salt) => {
    if (salt === null) {
        salt = CryptoJS.lib.WordArray.random(16).toString();
    }
    let out = CryptoJS.PBKDF2(password, salt, {keySize: 12, iterations: 1000});
    out.clamp();
    return {
        key: CryptoJS.lib.WordArray.create(out.words.slice(0, 8)),
        iv: CryptoJS.lib.WordArray.create(out.words.slice(8)),
        salt: salt
    };
}

module.exports = (password, filePath) => {
    const auth = '12D4500890k2+456';
    const data = fs.readFileSync(filePath).toString('base64');
    let result = null;
    if (data.slice(0, auth.length) === auth) {
        const {key, iv, _} = generateCfg(password, data.slice(auth.length, auth.length + 32));
        result = CryptoJS.AES.decrypt(data.slice(auth.length + 32), key, {iv: iv, mode: CryptoJS.mode.OFB}).toString(CryptoJS.enc.Utf8);
        if (result.slice(0, auth.length) !== auth) {
            return false;
        }
        result = result.slice(auth.length);
    }
    else {
        const {key, iv, salt} = generateCfg(password, null);
        result = auth + salt + CryptoJS.AES.encrypt(auth + data, key, {iv: iv, mode: CryptoJS.mode.OFB}).toString();
    }
    const buffer = Buffer.from(result, 'base64');
    fs.writeFileSync(filePath, buffer);
    return true;
}