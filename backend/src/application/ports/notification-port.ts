export interface INotificationPort {
  sendSMS(telephone: string, message: string): Promise<void>;
  sendEmail(email: string, subject: string, body: string): Promise<void>;
}
