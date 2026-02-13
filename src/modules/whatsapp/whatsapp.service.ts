/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  async sendMessage(to: string, content: string) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
      const authToken = process.env.TWILIO_AUTH_TOKEN as string;
      const from = process.env.TWILIO_WHATSAPP_NUMBER as string;

      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        new URLSearchParams({
          To: `whatsapp:${to}`,
          From: `whatsapp:${from}`,
          Body: content,
        }),
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
        },
      );

      console.log('✅ Status Twilio:', response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  }
}
