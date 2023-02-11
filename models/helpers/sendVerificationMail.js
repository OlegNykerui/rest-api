const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendVerificationMail = (email, verificationToken) => {
  sgMail.setApiKey(process.env.SEND_GRID_TOKEN);
  const msg = {
    to: email,
    from: "nykeruyoleg96@gmail.com,",
    subject: "Email verification",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken.toString()}">verify email ${email}</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("email send");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendVerificationMail;
