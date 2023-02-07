const nodemailer = require("nodemailer");
import { config as appConfig } from "../../config/config";

interface emailData {
  email: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmails = async (emailData: emailData) => {
  try {
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: appConfig.nodemailer.NODE_MAILER_HOST,
      port: appConfig.nodemailer.NODE_MAILER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: appConfig.nodemailer.NODE_MAILER_USER, // generated ethereal user
        pass: appConfig.nodemailer.NODE_MAILER_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: appConfig.nodemailer.NODE_MAILER_FROM, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      text: emailData.text, // plain text body
      html: emailData.html, // html body
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
