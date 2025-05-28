import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShippingModule } from './shipping/shipping.module';
import { ReturnsModule } from './returns/returns.module';
import { PricingModule } from './pricing/pricing.module';
import { DiscountModule } from './discount/discount.module';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseService } from './database/database.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    SuppliersModule,
    CategoriesModule,
    OrdersModule,
    TransactionsModule,
    WarehousesModule,
    InventoryModule,
    ShippingModule,
    ReturnsModule,
    PricingModule,
    DiscountModule,
    PaymentsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make configuration available globally
      envFilePath: '.env', // Load environment variables from .env file
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.PG_USER,
      host: process.env.PG_HOST,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
      database: process.env.DATABASE_URL,
      entities: ['*'],
      synchronize: true,
    }),

    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
