const cryptoRandomString = require("crypto-random-string");

const randomString = cryptoRandomString({ length: 8 });
console.log(randomString);
