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
                    const recipient = req.body.email;
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

app.post("/password/reset/verify", (req, res) => {
    const { code, password, email } = req.body;

    db.getCode(email)
        .then(({ rows }) => {
            if (rows[0]) {
                if (rows[0].code === code) {
                    // change password
                    hash(password).then((hashedPw) => {
                        db.updatePassword(email, hashedPw)
                            .then(() => {
                                console.log("password resetted successfully");
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "error while resetting password",
                                    err
                                );
                            });
                    });
                } else {
                    console.log(
                        "given code is not matching code found by given email"
                    );
                    res.json({ error: true });
                }
            } else {
                console.log("no code found by given email");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("error while getting code", err);
            res.json({ error: true });
        });
});

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

app.post("/submitBio", (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    db.updateBio(userId, bio)
        .then(() => {
            db.getBio(userId)
                .then(({ rows }) => {
                    console.log("TEST", rows);
                    const bio = rows[0].bio;
                    res.json({ success: true, bio: bio });
                })
                .catch((err) => {
                    console.log("error while getting bio after update", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error inserting bio:", err);
            res.json({ success: false });
        });
});

app.get("/bio", (req, res) => {
    const { userId } = req.session;
    db.getBio(userId)
        .then(({ rows }) => {
            res.json({ bio: rows[0].bio });
        })
        .catch((err) => {
            console.log("err in getting bio:", err);
            res.json({ success: false });
        });
});

app.get("/listUsers", (req, res) => {
    db.getRecentUsers()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => {
            console.log("error while getting recent users", err);
            res.json({ error: true });
        });
});

app.get("/listUsers/:search", (req, res) => {
    db.getUsersBySearch(req.params.search)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => {
            console.log("error while getting users by search", err);
            res.json({ error: true });
        });
});

app.get("/api/user/:id", (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    console.log("id", userId, id);
    if (userId === id) {
        res.redirect("/");
    } else {
        db.getUserDataById(id)
            .then(({ rows }) => {
                if (rows.length === 0) {
                    res.redirect("/");
                } else {
                    res.json({ success: true, data: rows[0] });
                }
            })
            .catch((err) => {
                console.log("error while getting users by Id", err);
                res.json({ error: true });
            });
    }
});

app.get("/api/relation/:id", (req, res) => {
    const { userId } = req.session;
    const { id: recipient_id } = req.params;

    db.getRelationship(userId, recipient_id)
        .then(({ rows }) => {
            res.json({ success: true, data: rows[0] });
        })
        .catch((err) => {
            console.log("error while getting relationship", err);
            res.json({ error: true });
        });
});

app.post("/api/relation/:action/:id", async (req, res) => {
    const { userId: sender_id } = req.session;
    const { id: recipient_id, action } = req.params;

    async function executeAction() {
        switch (action) {
            case "request":
                return await db.requestRelationship(sender_id, recipient_id);
            case "accept":
                return await db.acceptRelationship(sender_id, recipient_id);
            case "cancel":
            case "delete":
                return await db.cancelRelationship(sender_id, recipient_id);
            default:
                throw new Error("Action doesn't exist");
        }
    }

    executeAction()
        .then(({ data }) => {
            console.log("ACTION DATA", data);
            res.json({ success: true, data });
        })
        .catch((err) => {
            console.log("error while making actions:", action, err);
            res.json({ error: true });
        });
});

app.get("/api/friends-and-wannabes", (req, res) => {
    const { userId } = req.session;

    db.retrieveFriendStatus(userId)
        .then(({ rows }) => {
            res.json({ success: true, data: rows[0] });
        })
        .catch((err) => {
            console.log("error while getting friends & wannabes", err);
            res.json({ error: true });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening 🍰.");
});
