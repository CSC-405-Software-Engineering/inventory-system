import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { NotificationService } from './notification.service';

async function testMinimumStockEmail() {
    const app = await NestFactory.createApplicationContext(NotificationModule);
  
    const notificationService = app.get(NotificationService);
  
    // Replace the following with your actual data
    const testData = {
      email: 'zionumoh8@gmail.com',
      stock: 'ExampleStock',
      quantity: 5,
    };
  
    try {
      // Call the minimumStockEmail function
      await notificationService.minimumStockEmail(testData);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
    // Close the NestJS application context
    await app.close();
  }
  
  // Execute the test function
  testMinimumStockEmail();