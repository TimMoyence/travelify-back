import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

export default {
  async sendMail(ownerInfos, event, email) {
    const readFile = promisify(fs.readFile);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = await readFile(
      './app/services/mailer/inviteLink.html',
      'utf8',
    );
    const template = handlebars.compile(html);
    const data = {
      firstname: ownerInfos.firstname,
      lastname: ownerInfos.lastname,
      eventPassword: event.password,
      eventName: event.name,
    };
    const htmlToSend = template(data);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: `Travelify : ${data.firstname} vous à invité(e) à participer à son évènement`,
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
