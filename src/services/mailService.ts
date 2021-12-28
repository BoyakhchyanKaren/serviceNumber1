import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import sgMail from '@sendgrid/mail';
//
// dotenv.config();
// sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
//
// export async function createEmail(to: string | undefined, link: string) {
//   try {
//     const message = {
//       to,
//       from: String(process.env.USER_MAIL),
//       subject: 'Hello',
//       text: 'Hiii',
//       html:
//         `
//           <h1>Hello user</h1>
//           <a href='${link}'>Click on this link to activate you account ${link}</a>
//       `
//     };
//     await sgMail.send(message);
//     console.log("message sent");
//   } catch (e) {
//     console.log(e);
//   }
// };


// const user = process.env.USER_MAIL;
// const pass = process.env.USER_PASS;
//
//
// class mailService {
//   async createMessage (to:string | undefined, link:string) {
//     const message = {
//       to,
//       from: process.env.USER_MAIL,
//       subject: "Hello",
//       text: "Hiii",
//       html:
//         `
//           <h1>Hello user</h1>
//           <a href='${link}'>Click on this link to activate you account ${link}</a>
//       `
//     };
//     return await this.sendMail(message)
//   };
//   async sendMail(message:any) {
//     return await sgMail.send(message);
//   };
//
class mailService{
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
        service:"Outlook365",
        auth:{
          user:process.env.SMTP_USER,
          pass:process.env.SMTP_PASS,
        }
    });
  }

  async sendEmail(to: string | undefined, link: string, username:string)  {
    console.log("line1");
    await this.transporter.sendMail({
      from:process.env.SMTP_USER,
      to,
      subject:"Hello",
      text:"Hi",
      html:
      `
          <h1>Hello dear ${username},</h1>
          <h3>You have already registered here</h3>
          <a href="${link}">Click here and enjoy</a>
      `
    })
    console.log("line2");
  }

};

export default new mailService();