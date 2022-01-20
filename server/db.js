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
    const q = `SELECT code FROM password_reset_codes WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, hashedPW) => {
    const q = `UPDATE users SET password = $2 WHERE email = $1;`;
    const params = [email, hashedPW];
    return db.query(q, params);
};

module.exports.getLoggedInUser = (userId) => {
    const q = `SELECT id, first, last, profile_pic_url, bio FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.updateUserPic = (userId, url) => {
    const q = `UPDATE users SET profile_pic_url = $2 WHERE id = $1`;
    const params = [userId, url];
    return db.query(q, params);
};

module.exports.updateBio = (userId, bio) => {
    const q = `UPDATE users SET bio = $2 WHERE id = $1`;
    const params = [userId, bio];
    return db.query(q, params);
};

module.exports.getBio = (userId) => {
    const q = `SELECT bio FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getRecentUsers = () => {
    const q = `SELECT * FROM users ORDER BY created_at DESC LIMIT 3`;
    return db.query(q);
};

module.exports.getUsersBySearch = (val) => {
    const q = `SELECT * FROM users WHERE first ILIKE $1;`;
    const params = [val + "%"];
    return db.query(q, params);
};
module.exports.getUserDataById = (userId) => {
    const q = `SELECT id, first, last, profile_pic_url, bio FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getRelationship = (userId, viewedId) => {
    const q = `SELECT * FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, viewedId];
    return db.query(q, params);
};
module.exports.requestRelationship = (user1, user2) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING sender_id, recipient_id, accepted`;
    const params = [user1, user2];
    return db.query(q, params);
};
module.exports.acceptRelationship = (user1, user2) => {
    const q = `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING accepted`;
    const params = [user1, user2];
    return db.query(q, params);
};
module.exports.cancelRelationship = (user1, user2) => {
    const q = `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [user1, user2];
    return db.query(q, params);
};

module.exports.retrieveFriendStatus = (userId) => {
    const q = `SELECT users.id, users.first, users.last, users.profile_pic_url, accepted
  FROM friendships
  JOIN users ON (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id) OR
                (accepted = FALSE AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [userId];
    return db.query(q, params);
};
