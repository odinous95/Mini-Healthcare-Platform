import { IMailSender } from "../interfaces";

export class MailService implements IMailSender {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Implementation for sending mail
    console.log(`Sending mail to ${to} with subject "${subject}"`);
  }
}
