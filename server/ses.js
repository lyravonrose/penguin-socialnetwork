const aws = require("aws-sdk");
// const { AWS_KEY, AWS_SECRET } = require("./secrets.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}
const ses = new aws.SES({
    acessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "us-east-1",
});

module.exports.sendEmail = function (recipient, body, subject) {
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
        .promise();
};
