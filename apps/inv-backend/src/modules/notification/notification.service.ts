import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as moment from 'moment';

interface Email {
    to: string;
    data: any;
  }
  

@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService) {}

  async minimumStockEmail(data) {
    const { email, stock, quantity } = data;

    const subject = `Low Stock for ${stock}`;
    
    const htmlContent = await ejs.renderFile(
        './notification/emails/minimum.html',
        {
          stock,
          quantity,
        }
      );


    await this.mailerService.sendMail({
      to: email,
      subject,
      html: htmlContent,
      context: {
        stock,
        quantity, 
      },
    });
  };

  async maximumStockEmail(data) {
    const { email, stock, quantity } = data;

    const subject = `Max Stock for ${stock} has been reached`;
    
    const htmlContent = await ejs.renderFile(
        './notification/emails/maximum.html',
        {
          stock,
          quantity,
        }
      );


    await this.mailerService.sendMail({
      to: email,
      subject,
      html: htmlContent,
      context: {
        stock,
        quantity, 
      },
    });
  }
  async expiryDateEmail(data) {
    const { email, productName, expiryDate } = data;

    const daysUntilExpiry = moment(expiryDate).diff(moment(), 'days');

    const subject = `Expiry Reminder: ${productName} has ${daysUntilExpiry} days left to expire`;

    const htmlContent = await ejs.renderFile(
        './notification/emails/expiry.html',
        {
            productName,
            expiryDate,
            daysUntilExpiry
        }
    );

    await this.mailerService.sendMail({
        to: email,
        subject,
        html: htmlContent,
        context: {
            productName,
            expiryDate,
            daysUntilExpiry
        },
    });
}
}


