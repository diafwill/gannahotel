const nodemailer = require("nodemailer");
const ejs = require("ejs");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, dest) {
    this.to = dest;
    this.user = user;
    this.firstName = user.email.split("@")[0];
    this.from = `Ganna Hotel <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a ejs template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        firstName: this.firstName,
        user: this.user,
        subject
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendBooking() {
    await this.send("booking", "Nouvelle réservation !");
  }

  async sendClientBooking() {
    await this.send("booking-client", "Nouvelle réservation !");
  }
};
