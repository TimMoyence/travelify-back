import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

export default {
  async sendMail(userData) {
    const readFile = promisify(fs.readFile);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = await readFile('./app/services/mailer/register.html', 'utf8');
    const template = handlebars.compile(html);
    const data = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
    };
    const htmlToSend = template(data);

    const mailOptions = {
      from: process.env.MAIL,
      to: data.email,
      subject: `Bienvenue ${data.firstname} ${data.lastname}`,
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  },
};
