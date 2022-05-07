import nodemailer from 'nodemailer';
import { MailAdapter, MailAdapterData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'd78dd5951501f3',
    pass: '8a988b3a728c16',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'Gabriel Cardoso <gabrielcardosodeveloper@gmail.com>',
      subject,
      html: body,
    });
  }
}
