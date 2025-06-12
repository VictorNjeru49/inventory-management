import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ALLExceptionsFilter } from './http-exception.filters';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, DELETE, PATCH, PUT, HEAD',
    allowHeaders: 'Content-Type, Accept, Authorization, x-Requested-With',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Inventory Api')
    .setDescription(
      `
      🏭 Inventory Management System (IMS) 🏭
            is a robust software solution designed to streamline and optimize the management of inventory across various business sectors. It provides businesses with the tools necessary to track, manage, and control inventory levels, ensuring that the right products are available at the right time while minimizing excess stock and reducing operational costs.
  
      🔐 Key Features:🔐
      
        1. Real-Time Inventory Tracking: 
                The system allows for real-time monitoring of inventory levels, enabling businesses to keep an accurate count of stock on hand. This feature helps prevent stockouts and overstock situations, ensuring that inventory levels are always aligned with demand.
        
        2. Automated Reordering: 
                The IMS can be configured to automatically reorder products when stock levels fall below a predefined threshold. This automation reduces the risk of running out of essential items and ensures that inventory is replenished in a timely manner.
        
        3. Multi-Location Management: 
                For businesses operating in multiple locations, the inventory system supports multi-location management. Users can easily track inventory across various warehouses, stores, or distribution centers, providing a comprehensive view of stock availability.
        
        4. Detailed Reporting and Analytics: 
                The system offers advanced reporting features that provide insights into inventory turnover rates, sales trends, and stock levels. These analytics help businesses make informed decisions regarding purchasing, sales strategies, and inventory optimization.
        
        5. Supplier Management: 
                The IMS includes tools for managing supplier relationships, allowing users to store supplier information, track purchase orders, and evaluate supplier performance. This feature enhances procurement processes and helps businesses maintain strong supplier partnerships.
        
        6. Barcode and RFID Integration: 
                To improve accuracy and efficiency in inventory management, the system supports barcode scanning and RFID technology. This integration allows for quick and accurate stock counts, reducing manual entry errors and speeding up the inventory process.
        
        7. User Access Control: 
                The inventory system includes user access controls, enabling businesses to define roles and permissions for different users. This feature ensures that sensitive information is protected and that users only have access to the functions necessary for their roles.
        
        8. Integration with Other Systems: 
                The IMS can be integrated with other business systems such as accounting software, e-commerce platforms, and ERP systems. This seamless integration enhances operational efficiency by ensuring that all systems work together harmoniously.
        
        9. Mobile Access: 
                With mobile compatibility, users can access the inventory system from smartphones and tablets, allowing for on-the-go inventory management. This feature is particularly beneficial for businesses with field operations or those that require remote access.
        
        10. Customizable Dashboards: 
                Users can customize their dashboards to display key performance indicators (KPIs) and metrics relevant to their business needs. This personalization helps users quickly access the information they need to make data-driven decisions.
  
      Benefits of an Inventory Management System:
      
        
        ✅ Enhanced Efficiency: 
                By automating inventory processes and providing real-time data, the IMS reduces the time and effort required for manual inventory management.
        
        ✅ Cost Savings: 
                Effective inventory management minimizes excess stock and reduces carrying costs, leading to significant savings for businesses.
        
        ✅ Improved Customer Satisfaction: 
                With accurate inventory levels and timely order fulfillment, businesses can enhance customer satisfaction and loyalty.
        
        ✅ Informed Decision-Making: 
                Detailed analytics and reporting provide valuable insights that help businesses make strategic decisions regarding inventory, purchasing, and sales.
  
      🔚 
      Conclusion: 
            An effective Inventory Management System is critical for businesses looking to optimize their operations, reduce costs, and improve customer satisfaction. By leveraging advanced features and technology, the IMS empowers businesses to manage their inventory efficiently and effectively, ensuring they remain competitive in a dynamic market environment.
    `,
    )
    .setDescription('To check inventory')
    .setVersion('1.0')
    .addTag('Inventory', 'Inventory Endpoints')
    .addTag('Users', 'User Management Endpoints')
    .addTag('Warehouse', 'Warehouse Management Endpoints')
    .addTag('Products', 'Product Management Endpoints')
    .addTag('Orders', 'Order Management Endpoints')
    .addTag('Order Items', 'Order Item Management Endpoints')
    .addTag('Categories', 'Category Management Endpoints')
    .addTag('Transactions', 'Transaction Management Endpoints')
    .addTag('Payments', 'Payment Processing Endpoints')
    .addTag('Suppliers', 'Supplier Management Endpoints')
    .addTag('Shipping', 'Shipping Management Endpoints')
    .addTag('Returnee', 'Returns Management Endpoints')
    .addTag('Seed', 'Seeding data Endpoints')
    .addTag('Register', 'User Registration Endpoints')
    .addTag('Auth', 'Auth Endpoints')
    .addServer(`http://localhost:8000`, 'Local Development Server')
    .addServer(
      `https://inventory-management-kx6n.onrender.com`,
      'Production Server',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
      },
      'AccessToken',
    )
    .build();

  const documentfactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentfactory, {
    jsonDocumentUrl: '/api-json',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tryItOutEnabled: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin-bottom: 20px }
    `,
    customfavIcon: '../favicon/inventory.png',
    customSiteTitle: 'Inventory Documentation Api',
  });

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ALLExceptionsFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`The Server Port is listening at http://localhost:${PORT}/api`);
  });
}
bootstrap();
