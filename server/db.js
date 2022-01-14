const spicedPg = require("spiced-pg");
const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

console.log("db: ", db);
console.log(`[db] connecting to:${database}`);

module.exports.addUsers = (firstName, lastName, userEmail, userPassword) => {
    const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [firstName, lastName, userEmail, userPassword];
    return db.query(q, params);
};

module.exports.getUserByEmailAddress = (email) => {
    const q = `SELECT id, password FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.resetCode = (email, code) => {
    const q = `INSERT INTO password_reset_codes (email, code) 
    VALUES ($1, $2) 
    ON CONFLICT (email)
    DO UPDATE SET email = $1, code = $2
    RETURNING code;`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `SELECT code FROM password_reset_codes WHERE email = $1
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, hashedPW) => {
    const q = `UPDATE users SET password = $2 WHERE email = $1;`;
    const params = [email, hashedPW];
    return db.query(q, params);
};

module.exports.getLoggedInUser = (userId) => {
    const q = `SELECT id, first, last, profile_pic_url FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.updateUserPic = (userId, url) => {
    const q = `UPDATE users SET profile_pic_url = $2 WHERE id = $1`;
    const params = [userId, url];
    return db.query(q, params);
};
// SELECT from password_reset_codes to retrieve the last valid reset code for a given email address if available.
// The code being valid means that it the email and the code match and were found and that the code was generated less than 10 minutes ago.
// UPDATE users to update the password
