import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { NotificationService } from './notification.service';

async function testMaximumStockEmail() {
    const app = await NestFactory.createApplicationContext(NotificationModule);
  
    const notificationService = app.get(NotificationService);
  
    // Replace the following with your actual data
    const testData = {
      email: 'kaobimdiiwelumo@gmail.com',
      stock: 'ExampleStock',
      quantity: 1000,
    };
  
    try {
      // Call the maximumStockEmail function
      await notificationService.maximumStockEmail(testData);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
    // Close the NestJS application context
    await app.close();
  }
  
  // Execute the test function
  testMaximumStockEmail();