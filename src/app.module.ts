import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
