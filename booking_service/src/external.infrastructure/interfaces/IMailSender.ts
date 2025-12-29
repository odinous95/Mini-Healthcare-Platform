export interface IMailSender {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
