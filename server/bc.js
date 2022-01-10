const bcrypt = require("bcryptjs");
const { genSalt, hash, compare } = bcrypt;

module.exports.compare = compare;
module.exports.hash = (plainTextPW) =>
    genSalt().then((salt) => hash(plainTextPW, salt));
