import type { INotificationPort } from '../../application/ports/notification-port.js';

export class NotificationPort implements INotificationPort {
  async sendSMS(telephone: string, message: string): Promise<void> {
    // TODO: Intégrer un provider SMS (Twilio, Africa's Talking, etc.)
    console.log(`[SMS] À ${telephone}: ${message}`);
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    // TODO: Intégrer un provider email (SendGrid, Mailgun, etc.)
    console.log(`[EMAIL] À ${email} — ${subject}: ${body}`);
  }
}
