const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
const db = require("./db");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("./upload");
const s3 = require("./s3");

const sessionSecret =
    process.env.SESSION_SECRET || require("./secrets.json").SESSION_SECRET;

app.use(
    cookieSession({
        secret: `where is my smoothie`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    //once youve setup your cookie middeware you can comment in the below answer!!
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register.json", (req, res) => {
    console.log("req.body:", req.body);
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

app.post("/password/reset/start", (req, res) => {
    db.getUserByEmailAddress(req.body.email).then(({ rows }) => {
        if (rows[0]) {
            const secretCode = cryptoRandomString({
                length: 8,
            });
            db.resetCode(req.body.email, secretCode)
                .then(() => {
                    const recipient = `lyravonrosejewellery@gmail.com`;
                    const body = `Here is your new code: ${secretCode}`;
                    const subject = `Reset your password`;
                    sendEmail(recipient, body, subject)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("error while sending email", error);
                            res.json({ error: true });
                        });
                })
                .catch((error) => {
                    console.log("error while reset code insert", error);
                    res.json({ error: true });
                });
        } else {
            res.json({ error: true });
        }
    });
});

// app.post("/password/reset/confirm", (req, res) => {
//     const { email, password } = req.body;
// });

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const url = `https://onionxxib.s3.amazonaws.com/${req.file.filename}`;

    db.updateUserPic(req.session.userId, url)
        .then(({ rows }) => {
            res.json({ success: true, url });
        })
        .catch((err) => {
            console.log("error inserting images:", err);
            res.json({ success: false });
        });
});

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

app.get("/user", (req, res) => {
    const userId = req.session.userId;
    db.getLoggedInUser(userId)
        .then(({ rows }) => {
            if (rows.length === 0) {
                res.json({ error: true });
            }
            console.log(rows[0]);
            res.json({
                id: rows[0].id,
                first: rows[0].first,
                last: rows[0].last,
                profilePicUrl: rows[0].profile_pic_url,
            });
        })
        .catch((error) => {
            console.log("error while getting logged in user", error);
            res.json({ error: true });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening 🍰.");
});
