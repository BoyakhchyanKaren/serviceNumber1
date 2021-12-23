// import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';
import sgMail from '@sendgrid/mail';

dotenv.config();
sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));

export async function createEmail(to: string | undefined, link: string) {
  try {
    const message = {
      to,
      from: String(process.env.USER_MAIL),
      subject: 'Hello',
      text: 'Hiii',
      html:
        `
          <h1>Hello user</h1>
          <a href='${link}'>Click on this link to activate you account ${link}</a>
      `
    };
    await sgMail.send(message);
    console.log("message sent");
  } catch (e) {
    console.log(e);
  }
};


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
//   // transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
//   // constructor() {
//   //   this.transporter = nodemailer.createTransport({
//   //       service:"hotmail",
//   //       auth:{
//   //         user:user,
//   //         pass:pass
//   //       }
//   //   });
//   // }
//   //
//   // async sendEmail(to: string | undefined, link: string)  {
//   //   console.log("line1");
//   //   await this.transporter.sendMail({
//   //     from:user,
//   //     to,
//   //     subject:"Hello",
//   //     text:"Hi",
//   //     html:
//   //     `
//   //         <h1>Hello user</h1>
//   //         <a href="${link}">Click on this link to activate your account ${link}</a>
//   //
//   //     `
//   //   })
//   //   console.log("line2");
//   // }
//
// };
//
// export default new mailService();