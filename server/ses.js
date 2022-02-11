const aws = require("aws-sdk");
// const { AWS_KEY, AWS_SECRET } = require("./secrets.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    // console.log("in production");
    secrets = process.env;
} else {
    // secrets = require("./secrets.json");
}

aws.config = new aws.Config();
aws.config.accessKeyId = secrets.AWS_KEY;
aws.config.secretAccessKey = secrets.AWS_SECRET;

const ses = new aws.SES({
    // accessKeyId: secrets.AWS_KEY,
    // secretAccessKey: secrets.AWS_SECRET,
    region: "us-east-1",
});

module.exports.sendEmail = function (recipient, body, subject) {
    console.log("sendEmail😀", recipient, body, subject);
    return ses
        .sendEmail({
            Source: "Lyra <lyravonrosejewellery@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => {
            console.log("it worked");
        })
        .catch((error) => {
            console.log("error in ses", error);
        });
};
