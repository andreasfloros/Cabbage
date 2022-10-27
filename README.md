# Cabbage

A lightweight electron application for discreet encryption & decryption.

## Installation

Install [Node.js](https://nodejs.org/en/download/).

Run `npm install` at the root of the project to install dependencies.

Run `node test.js` to test the encryption/decryption pipeline.

Run `npm run-script build` to build the executable (Windows only at the moment).

## How to use

Select a file you want to encrypt / decrypt.

Right click and open with Cabbage / drag the file into Cabbage.

Enter your password.

Congratulations, you have encrypted / decrypted your data!

Note that there are automatic checks in place to ensure that:

- Cabbage operates in the correct mode (encryption/decryption)
- Cabbage only saves decrypted data if the entered password is correct

## Technical details

Cabbage uses AES-256 in OFB mode with PBKDF2.

Encrypted data has the following format:

`<auth><salt>AES-256(<auth><data>)`

Given a file:

If the authentication code is not detected as a prefix, Cabbage assumes encryption mode.

Otherwise, Cabbage enters decryption mode and uses the salt and the given password to decrypt.

Before saving the output of the decryption, Cabbage checks the authentication code for validation.
