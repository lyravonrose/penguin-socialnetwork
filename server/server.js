const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");

app.use(
    cookieSession({
        secret: `where is my smoothie`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    //once youve setup your cookie middeware you can comment in the below answer!!
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register.json", (req, res) => {
    console.log("🐶", req.body);
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            console.log("hashedPW:", hashedPw);
            return db.addUsers(first, last, email, hashedPw);
        })
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("registration err:", err);
            res.json({ success: false });
        });
});

app.get("/login.json", (req, res) => {
    res.json("login", {});
});

app.post("/login.json", (req, res) => {
    const { email, password } = req.body;
    db.getUserByEmailAddress(email)
        .then((result) => {
            compare(password, result.rows[0].password)
                .then((match) => {
                    req.session.userId = result.rows[0].id;
                    console.log(
                        "do provided PW and db stored hash match?",
                        match
                    );
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("err in compare:", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in compare:", err);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening 🍰.");
});
