const CryptoJS = require("crypto-js");
const { encrypt, decrypt, auth} = require('./crypto.js');

randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numTests = 100;

for (let i = 0; i < numTests; i++) {
    let dataLength = randomInt(1, 10000);
    let passwordLength = randomInt(1, 30);
    let data = CryptoJS.lib.WordArray.random(dataLength).toString();
    let password = CryptoJS.lib.WordArray.random(passwordLength).toString();
    let encrypted = encrypt(password, data);
    let decrypted = decrypt(password, encrypted).slice(auth.length);
    if (data !== decrypted) {
        console.log("Tests failed :(");
        return;
    }
}
console.log("Tests passed :)");