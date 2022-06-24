const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const emailMsg = require("../models/emailMessaging");
const Filter = require("bad-words");
const emailController = {};

emailController.sendEmailMsg = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;
  const filter = new Filter();
  const profmsg = subject + " " + message;
  const isProfane = filter.isProfane(profmsg);

  if (isProfane) {
    return res
      .status(500)
      .send("Failed to send email because it contains profane words");
  }
  try {
    const msg = {
      to,
      subject,
      text: message,
      from: "shivtechnica02@gmail.com", //has to be same to the one using which we created the sendgrid account
    };

    await sgMail.send(msg);
    //save to our db
    await emailMsg.create({
      sentBy: req.user?._id,
      from: req.user?.email,
      to,
      message,
      subject,
    });
    return res.status(200).send("Mail sent successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = emailController;
