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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { SeedModule } from './seed/seed.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AtGuard } from './auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { Keyv, createKeyv } from '@keyv/redis';
// import { LogsModule } from './logs/logs.module';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    DatabaseModule,
    OrderItemsModule,
    SeedModule,
    // LogsModule,
    RegisterModule,
    AuthModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          ttl: 90000,
          store: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
